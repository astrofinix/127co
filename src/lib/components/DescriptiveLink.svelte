<script lang="ts">
    export let links: { href: string; label: string, icon: string, description: string }[];
</script>

<div class="flex flex-col overflow-y-auto h-full">
    {#each links as link}
        <a
        href={link.href}
        class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
        >
        <span class="text-3xl material-symbols-outlined mr-5">
            {link.icon}
        </span>
        <div class="flex w-full flex-col h-full">
            <span>{link.label}</span>
            <span class="text-subtext z-4"
            >{link.description}</span
            >
        </div>
        <span
            class="relative z-4 right-100 bottom-0 material-symbols-outlined"
        >
            navigate_next
        </span>
        </a>
    {/each}
</div>