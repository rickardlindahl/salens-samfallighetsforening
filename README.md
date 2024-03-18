# Remix DnB Stack

![The Remix DnB Stack](https://github.com/robipop22/dnb-stack/blob/main/dnb-stack-preview.png?raw=true)

See it live: https://dnb-stack.vercel.app/

Learn more about [Remix Stacks](https://remix.run/stacks).

```sh
npx create-remix --template robipop22/dnb-stack
```

## What's in the stack

- [Vercel deployment](https://vercel.com/) with Vercel CLI
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments (all working via branching system)
- Proposed opinionated folder structure for the project
- Mocked api request for the project and route example
- Styling with [Tailwind](https://tailwindcss.com/)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

Make sure the dependencies are installed

```sh
bun i
```

Afterwards, start the Remix development server like so:

```sh
bun dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

Go to localhost:3000/books and you should see a list of books. This is a simple example of how to integrate a 3rd party API (tested, typed and mocked).

### Relevant code

This is a basic app that contains two routes, the index for documentation and the /books as a living example of how you can integrate a 3rd party API. The data is mocked and typed and also there are unit tests for the client functions.

## Deployment

This stack has a github action for automated deploy on merge on the following branches: **qa**, **dev** or **main**.

You just need to specify and configure the subdomains of your app.
Also from the settings in the repository you need to add Actions secrets so that the github action can deploy your app:

- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
- VERCEL_TOKEN

If you'd like to avoid using github action deploy, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging. There is a also a `qa` branch that is used for testing.

## Testing

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

You can run the tests with `bun run test` or `bun run vitest:coverage` to also show the coverage.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `bun lint`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `bun format:write` script you can run to format all files in the project.
