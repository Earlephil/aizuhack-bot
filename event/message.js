const ical2json = require("ical2json");
const axios = require('axios');
const dbAPI = 'https://sheetdb.io/api/v1/3cdihk7sl6quk';
// テキストメッセージの処理をする関数
const textEvent = async (event, client) => {
  // ユーザーIDを取得
  const { userId } = event.source;
  // DBからユーザーのデータを取得
  const data = (await axios.get(`${dbAPI}/search?userId=${userId}`)).data[0];
  // もしそのユーザーのデータが存在する場合
  if (data) {
    // もしcontextがmemoModeだったら
    if (data.context === 'memoMode') {
      // DBへメッセージのデータを追加してcontextを空にする
      await axios.put(`${dbAPI}/userId/${userId}`, { data: [{ message: event.message.text, context: '' }] });
      // index関数に返信するメッセージを返す
      return {
        type: 'text',
        text: `"${event.message.text}"を課題リストに追加しました`,
      };
    }
  }

  let message;

  // メッセージのテキストごとに条件分岐
  switch (event.message.text) {

    // 'メモ'というメッセージが送られてきた時
    case '課題提出状況': {
      // ユーザーのデータがDBに存在する時
      if (data) {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: `『課題リスト』\n\n${data.message}`,
        };
      } else {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: '課題は記入されていません',
        };
      }
      break;
    }
    // '課題リスト追加'というメッセージが送られてきた時
    case '課題リスト追加': {
      if (data) {
        await axios.put(`${dbAPI}/userId/${userId}`, { data: [{ context: 'memoMode' }] });
      } else {
        await axios.post(dbAPI, { data: [{ userId, context: 'memoMode' }] });
      }
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: '追加したい課題を送信してください',
      };
      break;
    }
    // '使用方法というメッセージが送られてきた時' //
    case '使用方法': {
      message = {
        type: 'text',
        text: '使用方法について\n２通りの方法で操作できます。\n\n①下部のメニューボタンから操作する方法です。\nメニューボタンをタップし、各ボタンをタップして操作してください。\n\n②文字を送信して操作する方法です。\n課題関連の操作を行いたい場合は、「課題」\nよく使うサイト一覧を表示したい場合は、「サイト一覧」\n授業関連の操作を行いたい場合は、「授業」と送信してください。\n\n癒されたい場合は、まず「その他」と送信してください。',
      };
      break;
    }

    case 'その他': {
      message = {
        type: 'text',
        text: 'ほめてほしいときは「ほめて！」\n狂ってほしいときは「狂って！」\n一緒に悲しんでほしいとき・botを泣かせたいときは、「ぴえん！」\n慰めてほしいときは、「ぱおん！」\nと送信してください。（！の数を増やすとメッセージが変わります）',
      };
      break;
    }

    case 'ほめて！': {
      message = {
        type: 'text',
        text: 'すごーい！ᐠ( ᐛ )ᐟ',
      };
      break;
    }

    case 'ほめて！！': {
      message = {
        type: 'text',
        text: '今日も生きててえらい\n｡ﾟ( ﾟஇдஇﾟ)ﾟ。',
      };
      break;
    }

    case 'ほめて！！！': {
      message = {
        type: 'text',
        text: 'おつかれさま、がんばったねえ\n(σ⁎˃ᴗ˂⁎)σண♡*',
      };
      break;
    }

    case 'ほめて！！！！': {
      message = {
        type: 'text',
        text: '天才!!!!!!!!!!!!!!!!!(((;°Д°;))))',
      };
      break;
    }

    case 'ほめて！！！！！': {
      message = {
        type: 'text',
        text: '最強(Дﾟ(○=(ﾟ∀ﾟ)=○)Дﾟ)',
      };
      break;
    }

    case '狂って！': {
      message = {
        type: 'text',
        text: '(☝ ՞ਊ ՞)☝ｷｴｴｴｴｴwww',
      };
      break;
    }

    case '狂って！！': {
      message = {
        type: 'text',
        text: 'ﾄﾞｩルルルㇽㇽㇽㇽㇽㇽㇽ三└(┐卍^o^)卍ﾄﾞｩﾙﾙﾙﾙﾙ',
      };
      break;
    }

    case '狂って！！！': {
      message = {
        type: 'text',
        text: '( ﾟ∀ﾟ)ｱﾊﾊ八八ﾉヽﾉヽﾉ ＼/ ＼',
      };
      break;
    }

    case '狂って！！！！': {
      message = {
        type: 'text',
        text: '＿人人人人人人人人人人人人＿\n＞あああァァああアアあああ＜\n＞ぁあぁアアアァあぁああァ＜\n￣Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^￣',
      };
      break;
    }

    case '狂って！！！！！': {
      message = {
        type: 'text',
        text: 'くぁｗせｄｒｆｔｇｙふじこｌｐ',
      };
      break;
    }

    case 'ぴえん！': {
      message = {
        type: 'text',
        text: '(´；ω；｀)ﾌﾞﾜｯ',
      };
      break;
    }

    case 'ぴえん！！': {
      message = {
        type: 'text',
        text: '(TдT) ｳｩ…',
      };
      break;
    }

    case 'ぴえん！！！': {
      message = {
        type: 'text',
        text: '｡･ﾟ･(ﾉД`)･ﾟ･｡ うえええん',
      };
      break;
    }

    case 'ぴえん！！！！': {
      message = {
        type: 'text',
        text: '｡ﾟヽ（ﾟ｀Д´ﾟ）ﾉﾟ｡ｳｧｧｧﾝ｡* ﾟ + ｡･ﾟ･｡･ヽ（ ﾟ｀Д´ﾟ）ﾉｳﾜｧｧｧｧｧｧﾝ',
      };
      break;
    }

    case 'ぴえん！！！！！': {
      message = {
        type: 'text',
        text: 'うあﾞぁあ ･ﾟ･(´Д⊂ヽ･ﾟ･ あﾞぁあぁﾞああぁぁうあﾞぁあﾞぁぁ',
      };
      break;
    }


    case 'ぱおん！': {
      message = {
        type: 'text',
        text: '(｡pωq｡)ヽ(ﾟωﾟ｀*)･･･ｮﾁｮﾁ',
      };
      break;
    }

    case 'ぱおん！！': {
      message = {
        type: 'text',
        text: '(´ё｀ｿﾝﾅｶｵ､ｽﾝﾅ!!m(~Д~)ｴｴｴｴﾝ',
      };
      break;
    }

    case 'ぱおん！！！': {
      message = {
        type: 'text',
        text: '＼(*゜ロ＼)*゜ロ＼)*゜ロ＼)ど...ど...ど...どんまい!',
      };
      break;
    }

    case 'ぱおん！！！！': {
      message = {
        type: 'text',
        text: '（　＾ω＾）つ□ 涙拭けお',
      };
      break;
    }

    case 'ぱおん！！！！！': {
      message = {
        type: 'text',
        text: 'ヽ(~-~(。。 )ゝ元気だしやぁ～',
      };
      break;
    }

    //'LMS課題リスト'というメッセージが送られてきた時
    case 'LMS課題リスト': {
      const iCalData = await axios.get('https://elms.u-aizu.ac.jp/calendar/export_execute.php?userid=7088&authtoken=2ee448ddec72b866f09f6652594c005708629cfb&preset_what=all&preset_time=recentupcoming');
      const output = ical2json.convert(iCalData.data);
      const VEvent = output.VCALENDAR[0].VEVENT;
      let msg = "";
      message = {
        type: "template",
        altText: "this is a carousel template",
        template: {
          type: "carousel",
          imageSize: "contain",
          columns: [
          ]
        }
      };
      output.VCALENDAR[0].VEVENT.forEach(element => {
        const date = new Date();
        let DTEND = (element.DTEND).slice(0, 4) + '-' + (element.DTEND).slice(4);
        DTEND = DTEND.slice(0, 7) + '-' + DTEND.slice(7);
        DTEND = DTEND.slice(0, 13) + ':' + DTEND.slice(13);
        DTEND = DTEND.slice(0, 16) + ':' + DTEND.slice(16);
        DTEND = new Date(DTEND);
        if (date < DTEND) {
          DTEND = new Date(DTEND.toLocaleString({ timeZone: 'Asia/Tokyo' }));
          msg = JSON.stringify(element);
          /* console.log(message.template.columns); */
          const column = {
            title: element.CATEGORIES,
            text: "課題: " + element.SUMMARY + "\n" + "期限:　" + element.DTEND,
            actions: [
              {
                type: "uri",
                label: "LMSで提出",
                uri: "https://elms.u-aizu.ac.jp/login/index.php"
              }
            ]
          }
          // console.log("課題: " + element.SUMMARY + "\n" + "期限:　" + element.DTEND);
          // return;
          message.template.columns.push(column);
          console.log(message.template.columns);
        }
        //LMS上に課題がない時
        /*else {
          column = {
            text: 'LMS上に課題はありません',
            actions: [
              {
                type: "uri",
                label: "LMSで提出",
                uri: "https://elms.u-aizu.ac.jp/login/index.php"
              }
            ]
          }
        }*/
        /* console.log(message.template.columns); */
        message.template.columns.splice(3);

      });
      // 返信するメッセージを作成
      break;
    }
    //'サイト一覧'というメッセージが送られてきたとき
    case 'サイト一覧': {
      message = {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "columns": [
            {
              "title": "学務システム",
              "text": "サイトを選んでください",
              "actions": [
                {
                  "type": "uri",
                  "label": "カレンダー",
                  "uri": "https://csweb.u-aizu.ac.jp/campusweb/campussmart.do?page=main&tabId=kh"
                },
                {
                  "type": "uri",
                  "label": "成績",
                  "uri": "https://csweb.u-aizu.ac.jp/campusweb/campussmart.do?page=main&tabId=si"
                },
                {
                  "type": "uri",
                  "label": "シラバス2021",
                  "uri": "http://web-ext.u-aizu.ac.jp/official/curriculum/syllabus/1_J_000.html"
                }
              ]
            },
            {
              "title": "LMS",
              "text": "サイトを選んでください",
              "actions": [
                {
                  "type": "uri",
                  "label": "ダッシュボード",
                  "uri": "https://elms.u-aizu.ac.jp/my/"
                },
                {
                  "type": "uri",
                  "label": "課題カレンダー",
                  "uri": "https://elms.u-aizu.ac.jp/calendar/view.php?view=month"
                },
                {
                  "type": "uri",
                  "label": "評定",
                  "uri": "https://elms.u-aizu.ac.jp/grade/report/overview/index.php"
                }
              ]
            },
            {
              "title": "English",
              "text": "サイトを選んでください",
              "actions": [
                {
                  "type": "uri",
                  "label": "M-Reader",
                  "uri": "https://mreader.org/index.php"
                },
                {
                  "type": "uri",
                  "label": "Really English",
                  "uri": "https://u-aizu.reallyenglish.jp/login"
                },
                {
                  "type": "uri",
                  "label": "MARUZEN",
                  "uri": "https://elib.maruzen.co.jp/elib/html/Top?0"
                }
              ]
            }
          ]
        }
      };
      break;
    }

    // '課題'というメッセージが送られてきた時
    case '課題': {
      // 返信するメッセージを作成
      message = {
        type: 'flex',
        altText: 'Flex Message',
        contents: {
          "type": "bubble",
          "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "color": "#ffffff",
                    "size": "xxl",
                    "text": "課題",
                    "weight": "bold",
                    "flex": 0,
                    "margin": "lg"
                  },
                  {
                    "type": "text",
                    "text": "の知りたい内容",
                    "color": "#FFFFFF",
                    "size": "lg",
                    "gravity": "bottom"
                  }
                ],
                "offsetTop": "30%",
                "position": "absolute",
                "offsetStart": "20px"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "color": "#000000",
                    "size": "sm",
                    "text": "以下から選択してください。",
                    "align": "center"
                  }
                ],
                "offsetTop": "70px"
              }
            ],
            "backgroundColor": "#1B96B1",
            "height": "140px"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "text": "完了した課題を入力",
                  "label": "完了した課題を入力"
                },
                "color": "#D1EAEF",
                "style": "secondary",
                "margin": "0px"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "課題のリストに追加",
                  "text": "課題リスト追加"
                },
                "color": "#D1EAEF",
                "margin": "10px",
                "style": "secondary"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "text": "課題提出状況",
                  "label": "課題提出状況"
                },
                "color": "#D1EAEF",
                "margin": "10px",
                "style": "secondary"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "LMS上の課題",
                  "text": "LMS課題リスト"
                },
                "color": "#D1EAEF",
                "margin": "10px",
                "style": "secondary"
              }
            ]
          },
          "size": "kilo"
        }
      };
      break;
    }

    // '授業'というメッセージが送られてきた時
    case '授業': {
      // 返信するメッセージを作成
      message = {
        type: 'flex',
        altText: 'Flex Message',
        contents: {
          "type": "bubble",
          "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "color": "#ffffff",
                    "size": "xxl",
                    "text": "授業",
                    "weight": "bold",
                    "flex": 0,
                    "margin": "lg"
                  },
                  {
                    "type": "text",
                    "text": "の知りたい内容",
                    "color": "#FFFFFF",
                    "size": "lg",
                    "gravity": "bottom"
                  }
                ],
                "offsetTop": "30%",
                "position": "absolute",
                "offsetStart": "20px"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "color": "#000000",
                    "size": "sm",
                    "text": "以下から選択してください。",
                    "align": "center"
                  }
                ],
                "offsetTop": "70px"
              }
            ],
            "height": "140px",
            "backgroundColor": "#FFA24D"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "text": "明日の授業",
                  "label": "明日の授業"
                },
                "color": "#FFEEDF",
                "style": "secondary"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "欠席数確認",
                  "text": "欠席数確認"
                },
                "color": "#FFEEDF",
                "margin": "10px",
                "style": "secondary"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "text": "授業欠席の入力",
                  "label": "授業欠席の入力"
                },
                "color": "#FFEEDF",
                "margin": "10px",
                "style": "secondary"
              }
            ]
          },
          "size": "kilo"
        }
      };
      break;
    }

    // 'こんにちは'というメッセージが送られてきた時
    case 'こんにちは': {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: 'Hello, world!!',
      };
      break;
    }

    // '複数メッセージ'というメッセージが送られてきた時
    case '複数メッセージ': {
      // 返信するメッセージを作成
      message = [
        {
          type: 'text',
          text: 'Hello, user',
        },
        {
          type: 'text',
          text: 'May I help you?',
        },
      ];
      break;
    }
    // 'クイックリプライ'というメッセージが送られてきた時
    case 'クイックリプライ': {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: 'クイックリプライ（以下のアクションはクイックリプライ専用で、他のメッセージタイプでは使用できません）',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'camera',
                label: 'カメラを開く',
              },
            },
            {
              type: 'action',
              action: {
                type: 'cameraRoll',
                label: 'カメラロールを開く',
              },
            },
            {
              type: 'action',
              action: {
                type: 'location',
                label: '位置情報画面を開く',
              },
            },
          ],
        },
      };
      break;
    }
    // 'スタンプメッセージ'というメッセージが送られてきた時
    case 'スタンプメッセージ': {
      // 返信するメッセージを作成
      message = {
        type: 'sticker',
        packageId: '446',
        stickerId: '1988',
      };
      break;
    }
    // '画像メッセージ'というメッセージが送られてきた時
    case '画像メッセージ': {
      // 返信するメッセージを作成
      message = {
        type: 'image',
        originalContentUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
        previewImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
      };
      break;
    }
    // '音声メッセージ'というメッセージが送られてきた時
    case '音声メッセージ': {
      // 返信するメッセージを作成
      message = {
        type: 'audio',
        originalContentUrl:
          'https://github.com/shinbunbun/aizuhack-bot/blob/master/media/demo.m4a?raw=true',
        duration: 6000,
      };
      break;
    }
    // '動画メッセージ'というメッセージが送られてきた時
    case '動画メッセージ': {
      // 返信するメッセージを作成
      message = {
        type: 'video',
        originalContentUrl: 'https://github.com/shinbunbun/aizuhack-bot/blob/master/media/demo.mp4?raw=true',
        previewImageUrl: 'https://raw.githubusercontent.com/shinbunbun/aizuhack-bot/master/media/thumbnail.jpg?raw=true',
      };
      break;
    }
    // '位置情報メッセージ'というメッセージが送られてきた時
    case '位置情報メッセージ': {
      // 返信するメッセージを作成
      message = {
        type: 'location',
        title: 'my location',
        address: '〒160-0004 東京都新宿区四谷一丁目6番1号',
        latitude: 35.687574,
        longitude: 139.72922,
      };
      break;
    }
    // 'イメージマップメッセージ'というメッセージが送られてきた時
    case 'イメージマップメッセージ': {
      // イメージマップの画像の作成方法には細かい指定があります。参考→https://developers.line.biz/ja/reference/messaging-api/#imagemap-message
      message = [
        {
          type: 'imagemap',
          baseUrl:
            'https://youkan-storage.s3.ap-northeast-1.amazonaws.com/ubic_bunbun',
          altText: 'This is an imagemap',
          baseSize: {
            width: 1040,
            height: 597,
          },
          actions: [
            {
              type: 'uri',
              area: {
                x: 26,
                y: 113,
                width: 525,
                height: 170,
              },
              linkUri: 'https://www.u-aizu.ac.jp/intro/faculty/ubic/',
            },
            {
              type: 'uri',
              area: {
                x: 33,
                y: 331,
                width: 780,
                height: 177,
              },
              linkUri: 'https://shinbunbun.info/about/',
            },
            {
              type: 'uri',
              area: {
                x: 939,
                y: 484,
                width: 94,
                height: 105,
              },
              linkUri: 'https://www.u-aizu.ac.jp/',
            },
          ],
        },
        {
          type: 'text',
          text: '「UBIC」や「しんぶんぶん」のところをTAPしてみよう！',
        },
      ];
      break;
    }
    // 'ボタンテンプレート'というメッセージが送られてきた時
    case 'ボタンテンプレート': {
      // 返信するメッセージを作成
      message = {
        type: 'template',
        altText: 'ボタンテンプレート',
        template: {
          type: 'buttons',
          thumbnailImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
          imageAspectRatio: 'rectangle',
          imageSize: 'cover',
          imageBackgroundColor: '#FFFFFF',
          title: 'ボタンテンプレート',
          text: 'ボタンだお',
          defaultAction: {
            type: 'uri',
            label: 'View detail',
            uri: 'https://shinbunbun.info/images/photos/',
          },
          actions: [
            {
              type: 'postback',
              label: 'ポストバックアクション',
              data: 'button-postback',
            },
            {
              type: 'message',
              label: 'メッセージアクション',
              text: 'button-message',
            },
            {
              type: 'uri',
              label: 'URIアクション',
              uri: 'https://shinbunbun.info/',
            },
            {
              type: 'datetimepicker',
              label: '日時選択アクション',
              data: 'button-date',
              mode: 'datetime',
              initial: '2021-06-01t00:00',
              max: '2022-12-31t23:59',
              min: '2021-06-01t00:00',
            },
          ],
        },
      };
      break;
    }
    // '確認テンプレート'というメッセージが送られてきた時
    case '確認テンプレート': {
      // 返信するメッセージを作成
      message = {
        type: 'template',
        altText: '確認テンプレート',
        template: {
          type: 'confirm',
          text: '確認テンプレート',
          actions: [
            {
              type: 'message',
              label: 'はい',
              text: 'yes',
            },
            {
              type: 'message',
              label: 'いいえ',
              text: 'no',
            },
          ],
        },
      };
      break;
    }
    // 'カルーセルテンプレート'というメッセージが送られてきた時
    case 'カルーセルテンプレート': {
      // 返信するメッセージを作成
      message = {
        type: 'template',
        altText: 'カルーセルテンプレート',
        template: {
          type: 'carousel',
          columns: [
            {
              thumbnailImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
              imageBackgroundColor: '#FFFFFF',
              title: 'タイトル1',
              text: '説明1',
              defaultAction: {
                type: 'uri',
                label: 'View detail',
                uri: 'https://shinbunbun.info/',
              },
              actions: [
                {
                  type: 'postback',
                  label: 'ポストバック',
                  data: 'postback-carousel-1',
                },
                {
                  type: 'uri',
                  label: 'URIアクション',
                  uri: 'https://shinbunbun.info/',
                },
              ],
            },
            {
              thumbnailImageUrl:
                'https://shinbunbun.info/images/photos/10.jpeg',
              imageBackgroundColor: '#FFFFFF',
              title: 'タイトル2',
              text: '説明2',
              defaultAction: {
                type: 'uri',
                label: 'View detail',
                uri: 'https://shinbunbun.info/',
              },
              actions: [
                {
                  type: 'postback',
                  label: 'ポストバック',
                  data: 'postback-carousel-2',
                },
                {
                  type: 'uri',
                  label: 'URIアクション',
                  uri: 'https://shinbunbun.info/',
                },
              ],
            },
          ],
          imageAspectRatio: 'rectangle',
          imageSize: 'cover',
        },
      };
      break;
    }
    // '画像カルーセルテンプレート'というメッセージが送られてきた時
    case '画像カルーセルテンプレート': {
      // 返信するメッセージを作成
      message = {
        type: 'template',
        altText: '画像カルーセルテンプレート',
        template: {
          type: 'image_carousel',
          columns: [
            {
              imageUrl: 'https://shinbunbun.info/images/photos/4.jpeg',
              action: {
                type: 'postback',
                label: 'ポストバック',
                data: 'image-carousel-1',
              },
            },
            {
              imageUrl: 'https://shinbunbun.info/images/photos/5.jpeg',
              action: {
                type: 'message',
                label: 'メッセージ',
                text: 'いえい',
              },
            },
            {
              imageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
              action: {
                type: 'uri',
                label: 'URIアクション',
                uri: 'https://shinbunbun.info/',
              },
            },
          ],
        },
      };
      break;
    }
    // 'Flex Message'というメッセージが送られてきた時
    case 'Flex Message': {
      // 返信するメッセージを作成
      message = {
        type: 'flex',
        altText: 'Flex Message',
        contents: {
          type: 'bubble',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'Flex Message',
                color: '#FFFFFF',
                weight: 'bold',
              },
            ],
          },
          hero: {
            type: 'image',
            url: 'https://pbs.twimg.com/profile_images/1236928986212478976/wDa51i9T_400x400.jpg',
            size: 'xl',
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'しんぶんぶん',
                size: 'xl',
                weight: 'bold',
                align: 'center',
              },
              {
                type: 'text',
                text: '会津大学学部一年',
                align: 'center',
              },
              {
                type: 'separator',
                margin: 'md',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'button',
                    action: {
                      type: 'uri',
                      label: 'ホームページ',
                      uri: 'https://shinbunbun.info/',
                    },
                    style: 'primary',
                    offsetBottom: '10px',
                  },
                  {
                    type: 'button',
                    action: {
                      type: 'uri',
                      label: 'Twitter',
                      uri: 'https://twitter.com/shinbunbun_',
                    },
                    style: 'primary',
                    color: '#1DA1F2',
                  },
                ],
                paddingTop: '10px',
              },
            ],
          },
          styles: {
            header: {
              backgroundColor: '#008282',
            },
          },
        },
      };
      break;
    }
    // 'プロフィール'というメッセージが送られてきた時
    case 'プロフィール': {
      // ユーザーのプロフィール情報を取得
      const profile = await client.getProfile(event.source.userId);
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `あなたの名前: ${profile.displayName}\nユーザーID: ${profile.userId}\nプロフィール画像のURL: ${profile.pictureUrl}\nステータスメッセージ: ${profile.statusMessage}`,
      };
      break;
    }
    // 'ここはどこ'というメッセージが送られてきた時
    case 'ここはどこ': {
      // 送信元がユーザーとの個チャだった場合
      if (event.source.type === 'user') {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: 'ここは個チャだよ！',
        };
        // 送信元がグループだった場合
      } else if (event.source.type === 'group') {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: 'ここはグループだよ！',
        };
      }
      break;
    }
    // 上で条件分岐した以外のメッセージが送られてきた時
    default: {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `受け取ったメッセージ: ${event.message.text}\nそのメッセージの返信には対応してません...`,
      };
      break;
    }
  }
  return message;
};

// イメージを処理する関数
const imageEvent = () => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: '画像を受け取りました！',
  };
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};

// ビデオを処理する関数
const videoEvent = () => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: 'ビデオを受け取りました！',
  };
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};

// オーディオを処理する関数
const audioEvent = () => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: 'オーディオを受け取りました！',
  };
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};

// ファイルを処理する関数
const fileEvent = () => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: 'ファイルを受け取りました！',
  };
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};

// 位置情報を処理する関数
const locationEvent = (event) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: `受け取った住所: ${event.message.address}`,
  };
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};

// スタンプメッセージを処理する関数
const stickerEvent = (event) => {
  let message;
  // スタンプのIDごとに条件分岐
  switch (event.message.stickerId) {
    // スタンプのIDが1988だった場合
    case '1988': {
      // 返信するメッセージを作成
      message = {
        type: 'sticker',
        packageId: '446',
        stickerId: '1989',
      };
      break;
    }
    // それ以外のIDだった場合
    default: {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `受け取ったstickerId: ${event.message.stickerId}\nそのスタンプの返信には対応してません...`,
      };
      break;
    }
  }
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};

// メッセージイベントが飛んできた時に呼び出される
exports.index = (event, client) => {
  let message;
  // メッセージタイプごとの条件分岐
  switch (event.message.type) {
    case 'text': {
      // テキストの場合はtextEventを呼び出す
      // 実行結果をmessageに格納する
      message = textEvent(event, client);
      break;
    }
    case 'image': {
      // イメージの場合はimageEventを呼び出す
      // 実行結果をmessageに格納する
      message = imageEvent();
      break;
    }
    case 'video': {
      // ビデオの場合はvideoEventを呼び出す
      // 実行結果をmessageに格納する
      message = videoEvent();
      break;
    }
    case 'audio': {
      // オーディオの場合はaudioEventを呼び出す
      // 実行結果をmessageに格納する
      message = audioEvent();
      break;
    }
    case 'file': {
      // ファイルの場合はfileEventを呼び出す
      // 実行結果をmessageに格納する
      message = fileEvent();
      break;
    }
    case 'location': {
      // 位置情報の場合はlocationEventを呼び出す
      // 実行結果をmessageに格納する
      message = locationEvent(event);
      break;
    }
    case 'sticker': {
      // スタンプの場合はstickerEventを呼び出す
      // 実行結果をmessageに格納する
      message = stickerEvent(event);
      break;
    }
    // それ以外の場合
    default: {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: 'そのイベントには対応していません...',
      };
      break;
    }
  }
  // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
  return message;
};
