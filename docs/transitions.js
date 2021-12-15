"use strict";

(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const occupation = urlParams.get("occupation");

  fetch(
    `http://ec2-35-176-173-137.eu-west-2.compute.amazonaws.com/transition/${occupation}?top_n_jobs=5`
  )
    .then((response) => response.json())
    .then((json) => {
      const data = json;

      document.title = `${occupation} - Career Transitions - Nesta`;
      document.getElementById("occupation-title").innerText = occupation;

      const tagComponent = function (similarity) {
        const sharedClasses =
          "md:w-1/4 w-1/3 text-sm text-center px-3 py-2 flex items-center justify-center";
        if (similarity === 1.0) {
          return `<div class="bg-green-100 text-green-700 ${sharedClasses}">Shared skill</div>`;
        } else if (similarity >= 0.8) {
          return `<div class="bg-cyan-100 text-cyan-700 ${sharedClasses}">Similar skill</div>`;
        } else {
          return `<div class="bg-orange-100 text-orange-700 ${sharedClasses}">Skill gap</div>`;
        }
      };

      const skillComponent = function (skill) {
        return `
      <div class="bg-white mb-2 flex items-stretch w-full">
        <div class="px-3 py-2 md:w-3/4 w-2/3">${skill.destination_skill}</div>
        ${tagComponent(skill.similarity)}
      </div>
    `;
      };

      const resultsComponent = function (data) {
        let htmlString = "";
        for (const [i, transition] of data.entries()) {
          htmlString += `
      <div class="card bg-slate-100 mb-6 w-full shadow-md">
        <div class="flex mb-3 justify-between items-center px-4 pt-4">
          <h2 class="text-xl capitalize">${i + 1}. ${
            transition.destination_label
          }</h2>
          <p class="ml-3 shrink-0 text-green-600 font-medium">${Math.floor(
            transition.similarity * 100
          )}% match</p>
        </div>
        <p class="mb-3 text-gray-600 px-4">${transition.description || ""}</p>
        <details class="px-4 pb-4">
          <summary><span class="cursor-pointer text-blue-600 hover:underline">Skills comparison</span></summary>
          <div class="mt-2">
            <p class="mb-3 text-gray-600 text-sm">
              If you are interested in this occupation you will need to fill any
              <span class="bg-orange-100 text-orange-700">&nbsp;skill gaps&nbsp;</span>
              and build on
              <span class="bg-cyan-100 text-cyan-700">&nbsp;similar skills&nbsp;</span>.
              Common qualifications: ${transition.qualification}.
            </p>
            ${transition.skills.map((s) => skillComponent(s)).join("")}
          </div>
        </details>
      </div>
    `;
        }
        return htmlString;
      };

      document.getElementById("results").innerHTML = resultsComponent(data);
    })
    .catch((err) => {
      console.log(err);
      // (window.location = "index.html#error")
    });
})();
