import request from "../assets/gleamstral-request.webp"

export const sideStudies = [
  {
    slug: "gleamstral",
    name: "Gleamstral",
    demo: "gleamstral",
    view: "request",
    heading: "Building a typed Mistral request in Gleam",
    description: "How Jérôme Schaeffer built Gleamstral, a typed Mistral library for Gleam. Inspect a chat request, change its response format, and decode sample replies in your browser.",
    lead: "I built Gleamstral so a Gleam application could describe a Mistral request in types and still choose its own HTTP client. The application can inspect the finished request before sending it, then pass the response back to the library to decode.",
    image: request,
    alt: "Gleamstral’s model, temperature, and response format controls beside the Gleam code that builds a chat request.",
    caption: "In the portfolio demo, changing a setting updates both the Gleam pipeline and the encoded request.",
    chapters: [
      { title: "What goes on the wire?", text: "The sample extracts a book title and its author from a sentence. Choosing JsonSchema adds the required fields to the request body. Try moving temperature above 1.5. The code pane shows the value supplied to the setter, while the body shows the bounded value the HTTP client would send." },
      { title: "When a successful request fails to decode", text: "A 200 status tells the caller the request succeeded. The response still has to match the structure the library expects. In one sample, the assistant message is missing a required field. Comparing that reply with the complete one shows where decoding fails. The 401 and 429 examples show how the caller can distinguish an authorization problem from a rate limit." },
    ],
    demoHeading: "Inspect a request and decode its reply",
    instructions: "Choose a model and switch between Text and JsonSchema. Then compare 200 OK with 200 · missing field. The request, replies, and decoded results are local examples you can inspect without an API key.",
    button: "Open request builder",
    source: "https://hexdocs.pm/gleamstral/",
    sourceLabel: "Gleamstral documentation",
  },
] as const
