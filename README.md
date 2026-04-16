## BREEDS_APP
Pet Breed Explorer

### Task

Create a web application using Next.js, TypeScript, and Tailwind CSS. The homepage should display a list of random breeds of cats and dogs in card format. Each card should show an image and the breed name. Clicking on a card should navigate the user to a breed page with detailed information about the selected breed and a gallery of images of animals of that breed.

### Implementation

To accomplish this task, I used a modern technology stack: Next.js for server-side rendering and routing, TypeScript for type safety and code reliability, and Tailwind CSS for quick and flexible styling of components.

**API Integration**: I integrated two external APIs — The Dog API and The Cat API. These APIs provide information and images of dog and cat breeds, respectively. On the homepage, I set up asynchronous requests to fetch random breed data from these APIs. Each breed is displayed as a card with an image and name.

**Application Structure**: I created two main pages. The homepage displays a list of breeds as cards using the data fetched from the APIs. Clicking on a card redirects the user to a separate breed page, where detailed information about the selected breed is shown, along with an additional gallery of images if available from the APIs.

**State Management**: I used React Hooks, such as `useState` and `useEffect`, to manage data fetching and component state efficiently.

**Styling**: Tailwind CSS was used to create an adaptive and visually appealing design for the cards and pages, ensuring flexible styling and maintaining clean, readable code.

Thus, the application meets all the requirements of the task, providing users with an intuitive interface to view information about cat and dog breeds.







This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
