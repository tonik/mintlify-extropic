# Mintlify Starter Kit

This is an in-progress build with a few tested layout/architecture choices.

The design is still in progress and there might be potential missing styles for some of the blocks. We ideally need the examples of documentation with all the blocks to implement it. The final approach will be decided after the design is finalized.

### Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where docs.json is)

```
mintlify dev
```

### Publishing Changes

Install Mintlify Github App to auto propagate changes from your repo to your deployment. Changes will be deployed to production automatically after pushing to the default branch. Find the link to install on your dashboard. 

#### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `docs.json`

### Using React Snippets

Currently, you can use React components as snippets in your markdown files. This allows you to create reusable components and layouts for your documentation. This is currently recommended approach for testing md elements.

### Example Snippet Usage
```mdx
import { TopVideo } from "/snippets/hero-background-video.mdx";
import { FooterVideo } from "/snippets/footer-video.mdx";   
import { Wrapper } from "/snippets/wrapper.mdx";    

<TopVideo />
<Wrapper>
## Your Content Here
</Wrapper>
<FooterVideo />
```