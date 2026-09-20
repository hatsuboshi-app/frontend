![Logo](https://github.com/user-attachments/assets/d3ce186e-11fb-460d-a9a6-8dd8e0633e3d)

# Hatsuboshi App

**[Hatsuboshi App](https://hatsuboshi.app/) is an unofficial _Gakuen IDOLM@STER_ companion web app designed to help students succeed in the producer division at Hatsuboshi Academy.**

- Browse, filter & search for various in-game assets / resources (e.g. Skills, P-Idols, Support Cards, etc.)
- High quality, community-maintained English translations for in-game resources (with emphasis on _quality_)
- Download, share or embed in-game assets / resources on various social media platforms
- Organize, design & visualize skill card / support card loadouts without committing to a produce run
- Various useful tools to help with raising your tantou idol to become the Prima Stella, and beyond!

> [!IMPORTANT]
> This project is hand-built by a fellow producer **without the use of any AI-generated content / code**.

**Feature demonstrations will be added here as they become available.**

## Technical Details

This app is built using [Next.js 16](https://nextjs.org/), and is deployed on [Vercel](https://vercel.com/).

> [!NOTE]
> This app depends on the [Hatsuboshi API](https://docs.hatsuboshi.app/api/), which is a public REST API, for all of its external functions (e.g. data-fetching, authentication, data editing, image uploading, etc.).
>
> Check out the [`hatsuboshi-app/backend`](https://github.com/hatsuboshi-app/backend) repository if you are interested in using the API to develop your own applications.

> [!TIP]
> The following environment variables are available to route API requests:
> - `NEXT_PUBLIC_API_URI` (default: `localhost:3001`)
> - `NEXT_PUBLIC_API_VERSION` (default: `v1`) 

To run the development server locally:

```bash
$ npm run dev
```

To build the app (& run the production-optimized build):

```bash
$ npm run build
$ npm run start
```

## Deployment

This app uses [GitHub Actions](https://github.com/features/actions) to automatically run CI/CD pipelines for deployment.

- The `main` branch automatically deploys to the production environment (https://hatsuboshi.app) on every push.
- The `dev` branch automatically deploys to the development environment (https://dev.hatsuboshi.app) on every push.
- For every other branch, a development preview deployment is automatically ran on every push.

## Contributing

Feel free to [open an issue](https://github.com/hatsuboshi-app/frontend/issues/new) for any bugs, feature requests, or questions to do with this app.

When contributing, please use _feature branching_ when implementing new features, and submit a pull request titled using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification, targeting the `dev` branch.

Feel free to contact me, [@HuzzuDesu on Twitter](https://x.com/HuzzuDesu) or `@huzzudesu` on Discord for any other questions or inquiries.

**There is currently no Discord server for the purposes of development for this app.**

## Disclaimer

> [!WARNING]
> This app is a part of a fan-made project and **NOT** an officially endorsed app for Gakuen IDOLM@STER, nor is it associated with BNEI, QualiArts Inc., or any other official entities. All rights to assets, contents & data belong to their respective copyright owners.
