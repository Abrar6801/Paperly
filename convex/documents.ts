import { ConvexError, v } from "convex/values";
import { mutation, query, MutationCtx } from "./_generated/server";
import {paginationOptsValidator} from "convex/server"

async function uniqueTitle(
  db: MutationCtx["db"],
  base: string,
  ownerId: string,
  organizationId: string | undefined,
): Promise<string> {
  const existing = organizationId
    ? await db
        .query("documents")
        .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
        .collect()
    : await db
        .query("documents")
        .withIndex("by_owner__id", (q) => q.eq("ownerId", ownerId))
        .collect();

  const titles = new Set<string>(existing.map((d) => d.title));

  if (!titles.has(base)) return base;

  let n = 2;
  while (titles.has(`${base} (${n})`)) n++;
  return `${base} (${n})`;
}

export const create = mutation({
  args: {title:v.optional(v.string()),initialContent:v.optional(v.string())},
  handler: async (ctx,args) => {
    const user = await ctx.auth.getUserIdentity();

    if(!user){
        throw new ConvexError("Unauthorized")
    }
    const organizationId= (user.organization_id ?? undefined) as
      | string
      | undefined

    const base = args.title ?? "Untitled Document";
    const title = await uniqueTitle(ctx.db, base, user.subject, organizationId);

    return await ctx.db.insert("documents",{
        title,
        ownerId: user.subject,
        organizationId,
        initialContent: args.initialContent,
    });
  },
});

export const get = query({
  args: {paginationOpts: paginationOptsValidator, search: v.optional(v.string())},
  handler: async (ctx,{search, paginationOpts}) => {
    const user = await ctx.auth.getUserIdentity()

    if(!user){
      throw new ConvexError("Unauthorized")
    }

    const organizationId= (user.organization_id ?? undefined) as
      | string
      | undefined
    // Search within organization
    if (search && organizationId){
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title",(q)=>
          q.search("title",search).eq("organizationId",organizationId)
        )
        .paginate(paginationOpts)
    }
    // Personal Search
    if(search){
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title",(q)=>
        q.search("title",search).eq("ownerId",user.subject))
        .paginate(paginationOpts)
    }
    //All docs inside organization
    if (organizationId){
      return await ctx.db
      .query("documents")
      .withIndex("by_organization_id",(q)=>q.eq("organizationId",organizationId))
      .order("desc")
      .paginate(paginationOpts);
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_owner__id",(q)=>q.eq("ownerId",user.subject))
      .order("desc")
      .paginate(paginationOpts);
  },
});

export const removeById = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx,args)=>{

    const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized");
    }

    const organizationId= (user.organization_id ?? undefined) as
      | string
      | undefined

    const document = await ctx.db.get(args.id);
    if(!document){
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId)

    if(!isOwner && !isOrganizationMember){
      throw new ConvexError("Unauthorized")
    }
    return await ctx.db.delete(args.id)
  }
})

export const updateById = mutation({
  args: {id: v.id("documents"), title:v.string()},
  handler: async (ctx,args)=>{
    const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized");
    }

    const organizationId= (user.organization_id ?? undefined) as
      | string
      | undefined


    const document = await ctx.db.get(args.id);
    if(!document){
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId)

    if(!isOwner && !isOrganizationMember){
      throw new ConvexError("Unauthorized")
    }
    return await ctx.db.patch(args.id,{title:args.title})
  }
})

export const getById = query({
  args: {id: v.id("documents")},
  handler: async (ctx,{id})=>{
    return await ctx.db.get(id)
  }
})