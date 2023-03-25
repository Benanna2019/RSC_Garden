# Digital Garden built with Nextjs app dir and React Server components.

## Initial move to Next app dir/RSC

The initial move over to Next app dir/RSC was from a desire to understand the new architecture to understand how it might be leveraged/utilized in apps/ideas I have. 

The currently state of this digital garden was really a journey in understanding when to use Server Components and Client Components. 

I still don't have everything figured out. In fact, I am far from it. I have vercel analytics on my site and the Web Vitals are coming in telling my app is scoring in the 'very poor' region (I made up the very poor thing but red indicates such things as this 😅). 

### Challenges

Currently, the challenges are not that large. This is mainly, I believe, becasue I am moving this site over from Remix which has given great patterns and helped me see how the new app dir architecture with RSC has many similarities. 

- [x] - nested layouts
- [x] - server rendering
- [] - progressive enhancement - I haven't figured this out and I don't really know if it is there yet. The mutations story is a not been written yet so when that happens I think the progressive enhancement will have been figured out. 

I also know, for a fact, that I don't fully understand how everything is working so I have probably messed up something from an optimization perspective. I've tried listening to podcasts and reading specs and watching videos, but from an understanding of how things are rendered in the tree, I probably have some optimization to do. 

### Next Steps

- [] - Add user login capability (for comments, likes, etc)
- [] - Setup supabase db for housing all comments/likes etc
- [] - Add collaborator capability (I occasionally will put out a draft article so I want to have collaborators be able to comment before its finished to make it most accurate
- [] - Tutorials/walkthroughs - I want to have video walk throughs or text based tutorials for learning anything from TS, Svelte, Next, React, Remix, Tailwind, etc.

## Other stuff

If you want to check out another app I built moving a Remix app to Nextjs app dir and RSC, here is the [github repo](https://github.com/Benanna2019/invoice-app-rsc). This app is definitely much more involved from getting into the weeds with the app dir and RSC. 
