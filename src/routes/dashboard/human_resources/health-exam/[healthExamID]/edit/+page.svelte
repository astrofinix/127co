<script>
  import EditHealthExamForm from "$lib/components/hr/edit/EditHealthExamForm.svelte";

  export let form;
  export let data;

  let exam = data.data[0];
</script>

<hr />
<h1>Editing Health Exam ID: {exam.HE_ID}</h1>
<EditHealthExamForm {form} {exam} />
<hr />
