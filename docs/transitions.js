"use strict";

(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const occupationSlug = urlParams.get("occupation");

  // fetch(`http://localhost:3000/${occupationSlug}`)
  //   .then((response) => response.json())
  //   .then((json) => {
  //     const data = json;

  const tempApi = {
    "hotel-concierge": [
      {
        name: "hotel porter",
        similarity: 0.571877,
        description:
          "Hotel porters welcome guests to accommodation facilities, help them carry their luggage and provide services such as occasional cleaning.",
        major_occupation_category: "Elementary Occupations",
        skills: [
          {
            origin_skill: "comply with food safety and hygiene",
            destination_skill: "comply with food safety and hygiene",
            similarity: 1.0,
          },
          {
            origin_skill: "take room service orders",
            destination_skill: "take room service orders",
            similarity: 0.899942,
          },
          {
            origin_skill: "handover the service area",
            destination_skill: "handle delivered packages",
            similarity: 0.664088,
          },
        ],
        qualifications: ["qual1", "qual2"],
      },
      {
        name: "porter hotel",
        similarity: 0.541877,
        description:
          "Hotel porters welcome guests to accommodation facilities, help them carry their luggage and provide services such as occasional cleaning.",
        major_occupation_category: "Services And Sales Workers",
        skills: [
          {
            origin_skill: "comply with food safety and hygiene",
            destination_skill: "comply with food safety and hygiene",
            similarity: 1.0,
          },
          {
            origin_skill: "take room service orders",
            destination_skill: "take room service orders",
            similarity: 0.699942,
          },
          {
            origin_skill: "handover the service area",
            destination_skill: "handle delivered packages",
            similarity: 0.664088,
          },
        ],
        qualifications: [],
      },
      {
        name: "hotel porter",
        similarity: 0.571877,
        description:
          "Hotel porters welcome guests to accommodation facilities, help them carry their luggage and provide services such as occasional cleaning.",
        major_occupation_category: "Elementary Occupations",
        skills: [
          {
            origin_skill: "comply with food safety and hygiene",
            destination_skill: "comply with food safety and hygiene",
            similarity: 1.0,
          },
          {
            origin_skill: "take room service orders",
            destination_skill: "take room service orders",
            similarity: 0.699942,
          },
          {
            origin_skill: "handover the service area",
            destination_skill: "handle delivered packages",
            similarity: 0.664088,
          },
        ],
      },
    ],
    "checkout-supervisor": [
      {
        name: "another role",
        similarity: 0.571877,
        skills: [
          {
            origin_skill: "comply with food safety and hygiene",
            destination_skill: "comply with food safety and hygiene",
            similarity: 1.0,
          },
          {
            origin_skill: "take room service orders",
            destination_skill: "take room service orders",
            similarity: 0.899942,
          },
          {
            origin_skill: "handover the service area",
            destination_skill: "handle delivered packages",
            similarity: 0.664088,
          },
        ],
      },
    ],
  };
  const data = tempApi[occupationSlug];

  const occupationTitle = occupationSlug.replace("-", " ").toLowerCase();
  document.title = `${occupationTitle} - Career Transitions - Nesta`;
  document.getElementById("occupation-title").innerText = occupationTitle;

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

  const qualificationsComponent = function (qualifications) {
    if (qualifications === undefined || qualifications.length === 0) {
      return "";
    } else {
      return `
        Common qualifications include: ${qualifications.join(", ")}.
      `;
    }
  };

  const resultsComponent = function (data) {
    let htmlString = "";
    for (const [i, transition] of data.entries()) {
      htmlString += `
      <div class="card bg-slate-100 mb-6 w-full shadow-md">
        <div class="flex mb-3 justify-between items-center px-4 pt-4">
          <h2 class="text-xl capitalize">${i + 1}. ${transition.name}</h2>
          <p class="text-green-600 font-medium">${Math.floor(
            transition.similarity * 100
          )}% match</p>
        </div>
        <p class="mb-3 text-gray-600 px-4">${transition.description || ""}</p>
        <details class="px-4 pb-4">
          <summary><span class="cursor-pointer text-blue-600 hover:underline">Skills comparison</span></summary>
          <div class="mt-2">
            <p class="mb-3 text-gray-600 text-sm">
              If you are interested in this occupation you will need to fill any <span class="bg-orange-100 text-orange-700">&nbsp;skill gaps&nbsp;</span> and build on <span class="bg-cyan-100 text-cyan-700">&nbsp;similar skills&nbsp;</span>.
              ${qualificationsComponent(transition.qualifications)}
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

  // })
  // .catch((_err) => (window.location = "/"));
})();
