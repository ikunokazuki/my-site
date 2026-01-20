// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 'blog' という名前のコレクションを定義
const blogCollection = defineCollection({
  type: 'content', // Markdown や MDX ファイルの場合
  schema: z.object({ // フロントマターの型定義 (Zodを使用)
    title: z.string(),
    pubDate: z.coerce.date(), // 文字列を日付型に変換
    description: z.string().optional(), // オプショナルな項目
    tags: z.array(z.string()).optional(), // 文字列の配列 (オプショナル)
    url: z.string().optional(), // ← 追加: カスタムURL用のフィールド (オプショナル)
  }),
});

// 定義したコレクションをエクスポート
export const collections = {
  'blog': blogCollection,
};

