# React-typescript-starter

Simple React boilerplate.
[Demo](https://hn-react-hooks.netlify.com)

## feature

- [x] jest
- [x] typescript
- [x] eslint
- [x] ServiceWorker(cache, offline)
- [x] SSR

## get started

```
git clone https://github.com/kmkzt/react-typescript-starter myproject
cd myproject
yarn
yarn dev
```

## Development mode

### SPA

```shell
# development
yarn dev

# Service worker development
yarn dev:sw

# production
yarn build
```

### SSR

```shell
# develpment
yarn ssr:dev

# [wip] SSR Production build
yarn ssr:build
```

## library

- react(v16.8.5)
- react-router-dom(v5.0.0)
- workbox-sw(v4.1.1)
