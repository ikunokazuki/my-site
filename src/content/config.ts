// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 'blog' という名前のコレクションを定義
const blogCollection = defineCollection({
  type: 'content', // Markdown や MDX ファイルの場合
  schema: z.object({ // フロントマターの型定義 (Zodを使用)
    title: z.string(),
    pubDate: z.coerce.date(), // 文字列を日付型に変換
    url: z.string().optional(), // ← 追加: カスタムURL用のフィールド (オプショナル)
    featureImage: z.string().url().optional(), // 画像はオプショナルにする場合
    featureImageAlt: z.string().optional(),
  }),
});

const psychologyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    url: z.string().optional(),
    category: z.string(),
    featureImage: z.string().url().optional(),
    featureImageAlt: z.string().optional(),
  }),
});

// 定義したコレクションをエクスポート
export const collections = {
  'blog': blogCollection,
  'psychology': psychologyCollection,
};

