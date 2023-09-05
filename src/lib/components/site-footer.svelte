<script>
  import * as siteConfig from "$lib/config/site";
  import { Icons } from "./icons";
  import { LightSwitch } from "./light-switch";

  function getYear(date = new Date()) {
    return date.getFullYear();
  }
</script>

<footer>
  <div class="mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between md:p-8">
    <div class="flex items-center justify-center space-x-6 md:order-2">
      <a href={siteConfig.links.allaBolag} class="text-gray-400 hover:text-gray-500">
        <span class="sr-only">Allabolag</span>
        <Icons.circleDollarSign class="h6 w-6" />
      </a>
      <a href={siteConfig.links.facebook} class="text-gray-400 hover:text-gray-500">
        <span class="sr-only">Facebook</span>
        <Icons.facebook class="h6 w-6" />
      </a>
      <a href={siteConfig.links.github} class="text-gray-400 hover:text-gray-500">
        <span class="sr-only">GitHub</span>
        <Icons.github class="h6 w-6" />
      </a>
      <div class="ml-8">
        <LightSwitch />
      </div>
    </div>
    <div class="my-8 md:order-1 md:my-0">
      <p class="text-center text-xs leading-5 text-gray-500">
        &copy; {getYear()} Salens Samfällighetsförening
      </p>
    </div>
  </div>
</footer>
