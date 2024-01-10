<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
</script>

<main class="w-full">
  <Breadcrumb items={[{ href: "/dashboard/finance", text: "Finance" }]} />

  <a
    href="/dashboard/finance/salary"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> man </span>
    <div class="flex w-full flex-col h-full">
      <span>Salary</span>
      <span class="text-subtext z-4">View the salaries of each employee</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/finance/budget"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> wallet </span>
    <div class="flex w-full flex-col h-full">
      <span>Budget</span>
      <span class="text-subtext z-4">View the summary of budgets</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/finance/expenditure"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> book </span>
    <div class="flex w-full flex-col h-full">
      <span>Expenditure</span>
      <span class="text-subtext z-4">Track the expenses of the company</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/finance/contract_transaction"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> receipt </span>
    <div class="flex w-full flex-col h-full">
      <span>Contract Transactions</span>
      <span class="text-subtext z-4"
        >Track the transactions made from the contracts</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/finance/profit"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> money </span>
    <div class="flex w-full flex-col h-full">
      <span>Profit</span>
      <span class="text-subtext z-4"
        >View the log of profits gained by the company</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
</main>
