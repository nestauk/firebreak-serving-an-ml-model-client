# Firebreak week serving an ML model client

A simple client side app to make use of the [Mapping Career Causways](https://github.com/nestauk/mapping-career-causeways) project via an API ([source code](https://github.com/nestauk/firebreak_serving-an-ml-model_server)).

## Building CSS

Assuming you have [NodeJS](https://nodejs.org) installed, you can run `npm run build-css` to generate a `style.css` file in the `docs` directory. This will also watch for changes to .html and .js files in the `docs` directory which can be useful during development. For more information see https://tailwindcss.com.

## Data

transitions.js makea a GET request to an endpoint similar to...

`<your server>/transition/hospital+porter?top_n_jobs=5`

...which returns...

```json
[
  {
    "destination_label": "hotel porter",
    "similarity": 0.571877,
    "description": "Hotel porters welcome guests to accommodation facilities, help them carry their luggage and provide services such as occasional cleaning.",
    "major_occupation_category": "Elementary Occupations",
    "skills": [
      {
        "origin_skill": "comply with food safety and hygiene",
        "destination_skill": "comply with food safety and hygiene",
        "similarity": 1.0
      },
      {
        "origin_skill": "take room service orders",
        "destination_skill": "take room service orders",
        "similarity": 0.899942
      },
      {
        "origin_skill": "handover the service area",
        "destination_skill": "handle delivered packages",
        "similarity": 0.664088
      }
    ],
    "qualification": "qual1, qual2"
  },
  ...
]
```
