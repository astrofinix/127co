<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
</script>

<main class="w-full">
  <Breadcrumb
    items={[{ href: "/dashboard/cooperative", text: "Cooperative" }]}
  />
  <a
    href="/dashboard/cooperative/Request"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> contract </span>
    <div class="flex w-full flex-col h-full">
      <span>Request</span>
      <span class="text-subtext z-4">Track all request applications.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/cooperative/Membership"
    class="bg-buttonp rounded-lg z-4 border-2 mb-1 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> group </span>
    <div class="flex w-full flex-col h-full">
      <span>Membership</span>
      <span class="text-subtext z-4">Know more about the members.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/cooperative/CM_Payout"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> money </span>
    <div class="flex w-full flex-col h-full">
      <span>Membership Payout</span>
      <span class="text-subtext z-4"
        >Track the payout transactions of all members.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/cooperative/SavingsAccounts"
    class="bg-buttonp rounded-lg z-4 border-2 mb-1 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> wallet </span>
    <div class="flex w-full flex-col h-full">
      <span>Savings Accounts</span>
      <span class="text-subtext z-4"
        >Assess the status of the savings accounts.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/cooperative/CS_Transaction"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> book </span>
    <div class="flex w-full flex-col h-full">
      <span>Savings Transactions</span>
      <span class="text-subtext z-4"
        >Track all transactions of all savings accounts.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/cooperative/LoanRecords"
    class="bg-buttonp rounded-lg z-4 border-2 mb-1 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> edit </span>
    <div class="flex w-full flex-col h-full">
      <span>Loan Records</span>
      <span class="text-subtext z-4"
        >Assess the status of the loan records.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/cooperative/CL_Transaction"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> contract </span>
    <div class="flex w-full flex-col h-full">
      <span>Loan Transactions</span>
      <span class="text-subtext z-4"
        >Track all transactions of all loan records.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
</main>
