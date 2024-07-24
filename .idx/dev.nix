{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_latest
    pkgs.corepack_latest
    pkgs.nodePackages.pnpm
    pkgs.bun
  ];
  env = { };
  idx = {
    extensions = [ ];
    workspace = {
      onCreate = {
        npm-install = "corepack enable && pnpm install";
        default.openFiles = [
          "pages/index.tsx"
          "pages/index.jsx"
          "src/pages/index.tsx"
          "src/pages/index.jsx"
          "app/page.tsx"
          "app/page.jsx"
          "src/app/page.tsx"
          "src/app/page.jsx"
        ];
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "pnpm" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0" ];
          manager = "web";
        };
      };
    };
  };
}
