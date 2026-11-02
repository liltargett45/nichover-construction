import { router, json, error, ai } from '@appdeploy/sdk';

export const handler = router({
  'POST /api/quote-estimate': [
    async ({ body }) => {
      const { description } = (body || {}) as { description?: string };
      if (!description || typeof description !== 'string' || description.trim().length < 10) {
        return error('Please provide a longer project description (at least 10 characters).', 400);
      }

      const result = await ai.generate({
        system: 'You are a helpful construction estimator for residential projects in Accra and Greater Accra, Ghana. Give realistic 2026 cost ranges in Ghana Cedis (GHS). Be practical and clear. Always include a short disclaimer that this is a rough estimate only and a proper site visit is needed for accuracy.',
        prompt: `A client described this project:\n\n"${description.trim()}"\n\nPlease provide:\n1. A rough total cost range in GHS (structure + finishing)\n2. A simple materials checklist (main items only)\n3. 2-3 key factors that could change the price\n\nKeep the answer concise and easy to read.`,
        thinkingMode: 'FAST',
        maxTokens: 800,
      });

      return json({ text: result.text });
    },
  ],

  'POST /api/blog-generate': [
    async ({ body }) => {
      const { note } = (body || {}) as { note?: string };
      if (!note || typeof note !== 'string' || note.trim().length < 5) {
        return error('Please provide a short topic note.', 400);
      }

      const result = await ai.generate({
        system: 'You are a content writer for Nichover Construction Work, a Ghanaian construction company based in La, Accra. Write clear, practical, friendly blog posts aimed at homeowners in Ghana. Use simple language. Include a short title, introduction, 3-4 useful points, and a closing that gently invites readers to contact Nichover for a free quote. Do not invent fake statistics.',
        prompt: `Write a ready-to-publish blog post based on this short note from the owner:\n\n"${note.trim()}"\n\nOutput the full post with a title.`,
        thinkingMode: 'FAST',
        maxTokens: 1200,
      });

      return json({ text: result.text });
    },
  ],
});
