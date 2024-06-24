async function deleteJob(id) {
  console.log("id");
  const res = confirm("Are you sure that you want to delete this job posting?");
  if (res) {
    const response = await fetch("/job/delete/" + id, {
      method: "POST",
    });
    if (response.ok) {
      location.reload();
    }
  }
}
