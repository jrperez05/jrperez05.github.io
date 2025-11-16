const form = () => {
  const contactForm = document.querySelector(".contactForm");
  const responseMessage = document.querySelector(".response");

  if (!contactForm || !responseMessage) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    responseMessage.classList.add("open");
    responseMessage.textContent = "Please wait...";

    try {
      const response = await fetch("mail.php", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.text();
      responseMessage.textContent = result;
      
      setTimeout(() => {
        responseMessage.classList.remove("open");
      }, 3000);
      
      form.reset();
    } catch (error) {
      responseMessage.textContent = "Error: " + error.message;
      setTimeout(() => {
        responseMessage.classList.remove("open");
      }, 3000);
    }
  });
};
export default form;
