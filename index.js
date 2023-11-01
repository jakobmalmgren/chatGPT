const API_KEY = "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";

// sk - RUFZJz4wogeuAGrWBonTT3BlbkFJTYsNUEke3tNI0XGwKZlo;
const submitButton = document.querySelector("#submit");
const output = document.querySelector("#output");
const input = document.querySelector("input");
const history = document.querySelector(".history");
const button = document.querySelector("button");

function changeInput(value) {
  const inputEl = document.querySelector("input");
  inputEl.value = value;
}

async function getMessage() {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json", // varför vissa "" andra inte...
    },
    body: JSON.stringify({
      //varför stringify här...
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: input.value,
        },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    output.textContent = data.choices[0].message.content;
    if (data.choices[0].message.content && input.value) {
      const pElement = document.createElement("p");
      pElement.addEventListener("click", () => {
        changeInput(pElement.textContent);
      });
      pElement.textContent = input.value;
      history.append(pElement);
    }
  } catch (error) {
    console.log(error);
  }
}
function clearInput() {
  input.value = "";
}
submitButton.addEventListener("click", getMessage);
button.addEventListener("click", clearInput);
