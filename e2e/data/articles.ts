import { people } from './people';

const body = `
<p>Augustine never saw a computer. But few writers have thought harder about what it is to remember, to pay attention and to be distracted, and those are exactly the things large language models seem to do.</p>
<p>In Book X of the <em>Confessions</em>, he walks through the “fields and vast palaces of memory” and is astonished by what he finds there.</p>
<h2 id="what-a-model-remembers">What a model “remembers”</h2>
<p>A language model is trained on a vast body of text and learns which words tend to follow which.<sup><a href="#fn-1" id="fnref-1" aria-describedby="footnotes-title">1</a></sup></p>
<p>The psalmist asks, <span class="ref">Psalm 8:4 <span class="muted">(NRSV)</span></span>, “what are human beings that you are mindful of them?”</p>
<blockquote><p>“A store of data is not a self. Augustine would have said that a self is a memory turned toward love.”</p></blockquote>
<h2 id="attention">Attention, then and now</h2>
<p>Augustine also knew distraction.</p>
<h3>Three questions to take with you</h3>
<ul><li>What do I hope a chatbot will remember for me?</li><li>Where does my attention go when I reach for a screen?</li></ul>
<section aria-labelledby="footnotes-title">
  <h2 id="footnotes-title">Notes</h2>
  <ol><li id="fn-1">Dr. Joel Santos explains this well in <a href="/videos/inside-a-neural-network-in-ten-minutes">Inside a Neural Network in Ten Minutes</a>. <a href="#fnref-1" aria-label="Back to reference 1">↩</a></li></ol>
</section>
<script>window.__articleScriptRan = true</script>
`;

/** GET /api/v1/articles/{slug}: docs/mocks/pages/article-page/default. */
export const augustineArticle = {
  id: 'a-augustine-llms',
  slug: 'what-augustine-might-say-about-large-language-models',
  title: 'What Augustine Might Say About Large Language Models',
  subtitle:
    "A church historian reads today's chatbots alongside the Confessions, and finds an old warning about memory, attention and the restless heart.",
  coverUrl: '/media/ruth-alvarez.jpg',
  coverAlt: 'An open book beside a glowing laptop screen, drawn in line',
  contributors: [people.lucia],
  publishedAt: '2026-09-29',
  updatedAt: '2026-10-06',
  readingMinutes: 12,
  bodyHtml: body,
  topics: [
    { name: 'Theology of technology', slug: 'theology-of-technology' },
    { name: 'Philosophy of mind', slug: 'philosophy-of-mind' },
    { name: 'Formation and education', slug: 'formation-and-education' },
  ],
  commentCount: 23,
  saved: false,
  correction: null,
};
