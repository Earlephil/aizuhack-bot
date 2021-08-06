// フォローイベントがとんできた時
exports.index = () => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: '友達追加ありがとうございます！このLINE Botの使用方法を確認する際は、「使用方法」と入力してください。',
  };
  // 返信するメッセージをこの関数の呼び出し元（bot.js）に返す
  return message;
};
