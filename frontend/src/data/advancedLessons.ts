export interface AdvancedLessonContent {
  grammar: { title: string; description: string; example: string }[];
  vocabulary: { japanese: string; romaji: string; english: string }[];
}

export interface AdvancedLessonData {
  num: number;
  title: string;
  english: string;
}

export const advancedLessonContent: Record<number, AdvancedLessonContent> = {
  "26": {
    "grammar": [
      {
        "title": "〜なら",
        "description": "Use 〜なら to respond to a condition or topic someone brings up.\n\"If it is/if you mean ~\"",
        "example": "雨なら 家で勉強します\n(ame nara ie de benkyou shimasu)\nIf it rains, I will study at home"
      },
      {
        "title": "〜ば",
        "description": "Use the conditional 〜ば for general results or natural consequences.\n\"If ~, then ~\"",
        "example": "時間があれば 参加できます\n(jikan ga areba sanka dekimasu)\nIf I have time, I can join"
      }
    ],
    "vocabulary": [
      {
        "japanese": "時間",
        "romaji": "jikan",
        "english": "time"
      },
      {
        "japanese": "参加する",
        "romaji": "sanka suru",
        "english": "to participate"
      },
      {
        "japanese": "予定",
        "romaji": "yotei",
        "english": "schedule, plan"
      },
      {
        "japanese": "変更する",
        "romaji": "henkou suru",
        "english": "to change, revise"
      },
      {
        "japanese": "間に合う",
        "romaji": "maniau",
        "english": "to be in time"
      },
      {
        "japanese": "連絡する",
        "romaji": "renraku suru",
        "english": "to contact"
      },
      {
        "japanese": "たぶん",
        "romaji": "tabun",
        "english": "probably"
      },
      {
        "japanese": "都合",
        "romaji": "tsugou",
        "english": "convenience, availability"
      }
    ]
  },
  "27": {
    "grammar": [
      {
        "title": "〜たら",
        "description": "Use 〜たら for \"if/when\" after one action or state is completed.\nIt often sounds concrete and personal.",
        "example": "時間があったら 復習します\n(jikan ga attara fukushuu shimasu)\nIf I have time, I will review"
      },
      {
        "title": "〜ても",
        "description": "Use 〜ても for \"even if\" or to show that the result does not change.\n\"Even if ~\"",
        "example": "少し遅れても 大丈夫です\n(sukoshi okurete mo daijoubu desu)\nEven if you are a little late, it is okay"
      }
    ],
    "vocabulary": [
      {
        "japanese": "復習する",
        "romaji": "fukushuu suru",
        "english": "to review"
      },
      {
        "japanese": "予習する",
        "romaji": "yoshuu suru",
        "english": "to prepare for a lesson"
      },
      {
        "japanese": "散歩する",
        "romaji": "sanpo suru",
        "english": "to take a walk"
      },
      {
        "japanese": "途中",
        "romaji": "tochuu",
        "english": "on the way, midway"
      },
      {
        "japanese": "遅れる",
        "romaji": "okureru",
        "english": "to be late"
      },
      {
        "japanese": "眠い",
        "romaji": "nemui",
        "english": "sleepy"
      },
      {
        "japanese": "念のため",
        "romaji": "nen no tame",
        "english": "just in case"
      },
      {
        "japanese": "空く",
        "romaji": "aku",
        "english": "to open up, become free"
      }
    ]
  },
  "28": {
    "grammar": [
      {
        "title": "受け身形",
        "description": "Use the passive form to show that the subject receives an action.\n\"be done by ~\"",
        "example": "私は 先生に ほめられました\n(watashi wa sensei ni homeraremashita)\nI was praised by the teacher"
      },
      {
        "title": "迷惑の受け身",
        "description": "A passive sentence can also show that the speaker was affected in an unwanted way.\n\"I was inconvenienced by ~\"",
        "example": "雨に降られて 服がぬれました\n(ame ni furarete fuku ga nuremashita)\nI got rained on and my clothes got wet"
      }
    ],
    "vocabulary": [
      {
        "japanese": "ほめる",
        "romaji": "homeru",
        "english": "to praise"
      },
      {
        "japanese": "しかられる",
        "romaji": "shikarareru",
        "english": "to be scolded"
      },
      {
        "japanese": "発表",
        "romaji": "happyou",
        "english": "presentation, announcement"
      },
      {
        "japanese": "選ばれる",
        "romaji": "erabareru",
        "english": "to be chosen"
      },
      {
        "japanese": "盗まれる",
        "romaji": "nusumareru",
        "english": "to be stolen"
      },
      {
        "japanese": "被害",
        "romaji": "higai",
        "english": "damage, harm"
      },
      {
        "japanese": "驚く",
        "romaji": "odoroku",
        "english": "to be surprised"
      },
      {
        "japanese": "理由",
        "romaji": "riyuu",
        "english": "reason"
      }
    ]
  },
  "29": {
    "grammar": [
      {
        "title": "使役形",
        "description": "Use the causative form to make or let someone do something.\n\"make/let ~ do\"",
        "example": "母は 子どもに 野菜を 食べさせます\n(haha wa kodomo ni yasai o tabesasemasu)\nThe mother makes the child eat vegetables"
      },
      {
        "title": "〜させてください",
        "description": "Use 〜させてください to ask for permission to do something yourself.\n\"Please let me ~\"",
        "example": "私にも 説明させてください\n(watashi ni mo setsumei sasete kudasai)\nPlease let me explain as well"
      }
    ],
    "vocabulary": [
      {
        "japanese": "世話する",
        "romaji": "sewa suru",
        "english": "to take care of"
      },
      {
        "japanese": "練習させる",
        "romaji": "renshuu saseru",
        "english": "to make someone practice"
      },
      {
        "japanese": "片づける",
        "romaji": "katazukeru",
        "english": "to tidy up"
      },
      {
        "japanese": "任せる",
        "romaji": "makaseru",
        "english": "to entrust"
      },
      {
        "japanese": "自由に",
        "romaji": "jiyuu ni",
        "english": "freely"
      },
      {
        "japanese": "無理に",
        "romaji": "muri ni",
        "english": "forcibly, against one’s will"
      },
      {
        "japanese": "相談する",
        "romaji": "soudan suru",
        "english": "to consult"
      },
      {
        "japanese": "責任",
        "romaji": "sekinin",
        "english": "responsibility"
      }
    ]
  },
  "30": {
    "grammar": [
      {
        "title": "〜ように",
        "description": "Use 〜ように for goals, purposes, or desired states, especially with potential or negative forms.\n\"so that ~\"",
        "example": "忘れないように メモします\n(wasurenai you ni memo shimasu)\nI take notes so I will not forget"
      },
      {
        "title": "〜ておく",
        "description": "Use 〜ておく for doing something in advance or leaving it as is for later.\n\"do beforehand\"",
        "example": "会議の前に 資料を 印刷しておきます\n(kaigi no mae ni shiryou o insatsu shite okimasu)\nI will print the materials before the meeting"
      }
    ],
    "vocabulary": [
      {
        "japanese": "メモする",
        "romaji": "memo suru",
        "english": "to take notes"
      },
      {
        "japanese": "準備する",
        "romaji": "junbi suru",
        "english": "to prepare"
      },
      {
        "japanese": "予約する",
        "romaji": "yoyaku suru",
        "english": "to reserve"
      },
      {
        "japanese": "確認する",
        "romaji": "kakunin suru",
        "english": "to confirm"
      },
      {
        "japanese": "忘れ物",
        "romaji": "wasuremono",
        "english": "forgotten item"
      },
      {
        "japanese": "目覚まし",
        "romaji": "mezamashi",
        "english": "alarm clock"
      },
      {
        "japanese": "用意する",
        "romaji": "youi suru",
        "english": "to get ready"
      },
      {
        "japanese": "印刷する",
        "romaji": "insatsu suru",
        "english": "to print"
      }
    ]
  },
  "31": {
    "grammar": [
      {
        "title": "お/ご〜になる",
        "description": "Use お/ご〜になる as an honorific pattern for someone else’s actions.\nIt raises the listener or subject.",
        "example": "部長は もうお帰りになります\n(buchou wa mou okaeri ni narimasu)\nThe manager will already go home"
      },
      {
        "title": "尊敬語の特別形",
        "description": "Some honorific verbs have special forms such as いらっしゃる, なさる, and 召し上がる.\nLearn them as fixed expressions.",
        "example": "社長は 今 会議室に いらっしゃいます\n(shachou wa ima kaigishitsu ni irasshaimasu)\nThe president is in the meeting room now"
      }
    ],
    "vocabulary": [
      {
        "japanese": "部長",
        "romaji": "buchou",
        "english": "department manager"
      },
      {
        "japanese": "お客様",
        "romaji": "okyakusama",
        "english": "customer, guest"
      },
      {
        "japanese": "会議室",
        "romaji": "kaigishitsu",
        "english": "meeting room"
      },
      {
        "japanese": "案内する",
        "romaji": "annai suru",
        "english": "to guide"
      },
      {
        "japanese": "お戻りになる",
        "romaji": "omodori ni naru",
        "english": "to return (honorific)"
      },
      {
        "japanese": "召し上がる",
        "romaji": "meshiagaru",
        "english": "to eat, drink (honorific)"
      },
      {
        "japanese": "なさる",
        "romaji": "nasaru",
        "english": "to do (honorific)"
      },
      {
        "japanese": "いらっしゃる",
        "romaji": "irassharu",
        "english": "to be/go/come (honorific)"
      }
    ]
  },
  "32": {
    "grammar": [
      {
        "title": "お/ご〜する",
        "description": "Use お/ご〜する to humbly describe your own actions toward another person.\nIt lowers the speaker and sounds polite.",
        "example": "こちらで ご説明します\n(kochira de go-setsumei shimasu)\nI will explain it here"
      },
      {
        "title": "謙譲語の特別形",
        "description": "Some humble verbs have fixed forms such as 伺う, 拝見する, and 申し上げる.\nUse them for formal business Japanese.",
        "example": "後ほど 先生のお話を 伺います\n(nochihodo sensei no ohanashi o ukagaimasu)\nI will listen to the teacher later"
      }
    ],
    "vocabulary": [
      {
        "japanese": "資料",
        "romaji": "shiryou",
        "english": "materials, documents"
      },
      {
        "japanese": "拝見する",
        "romaji": "haiken suru",
        "english": "to look at (humble)"
      },
      {
        "japanese": "伺う",
        "romaji": "ukagau",
        "english": "to visit, ask, hear (humble)"
      },
      {
        "japanese": "申し上げる",
        "romaji": "moushiageru",
        "english": "to say (humble)"
      },
      {
        "japanese": "持参する",
        "romaji": "jisan suru",
        "english": "to bring"
      },
      {
        "japanese": "恐れ入ります",
        "romaji": "osoreirimasu",
        "english": "I am sorry to trouble you"
      },
      {
        "japanese": "早速",
        "romaji": "sassoku",
        "english": "at once, promptly"
      },
      {
        "japanese": "確認いたします",
        "romaji": "kakunin itashimasu",
        "english": "I will confirm (humble)"
      }
    ]
  },
  "33": {
    "grammar": [
      {
        "title": "〜見込みだ",
        "description": "Use 〜見込みだ in formal speech and writing to express an expectation or forecast.\n\"is expected to ~\"",
        "example": "売上は 来月 回復する見込みです\n(uriage wa raigetsu kaifuku suru mikomi desu)\nSales are expected to recover next month"
      },
      {
        "title": "〜ことになる",
        "description": "Use 〜ことになる when a decision or rule has been established.\n\"It has been decided that ~\"",
        "example": "来月から 新しい制度を 使うことになりました\n(raigetsu kara atarashii seido o tsukau koto ni narimashita)\nIt has been decided that we will use the new system from next month"
      }
    ],
    "vocabulary": [
      {
        "japanese": "延期する",
        "romaji": "enki suru",
        "english": "to postpone"
      },
      {
        "japanese": "見込み",
        "romaji": "mikomi",
        "english": "outlook, expectation"
      },
      {
        "japanese": "方針",
        "romaji": "houshin",
        "english": "policy, plan"
      },
      {
        "japanese": "傾向",
        "romaji": "keikou",
        "english": "trend"
      },
      {
        "japanese": "景気",
        "romaji": "keiki",
        "english": "business conditions, economy"
      },
      {
        "japanese": "改善する",
        "romaji": "kaizen suru",
        "english": "to improve"
      },
      {
        "japanese": "影響",
        "romaji": "eikyou",
        "english": "influence, impact"
      },
      {
        "japanese": "制度",
        "romaji": "seido",
        "english": "system, institution"
      }
    ]
  },
  "34": {
    "grammar": [
      {
        "title": "〜かねる",
        "description": "Use 〜かねる in formal Japanese to say something is difficult to do.\nIt sounds softer than a direct refusal.",
        "example": "そのご要望には お応えしかねます\n(sono go-youbou ni wa o-kotae shikanemasu)\nWe are unable to meet that request"
      },
      {
        "title": "〜わけではない",
        "description": "Use 〜わけではない for partial negation.\n\"It is not that ~\" or \"not necessarily ~\"",
        "example": "安ければ いいというわけではありません\n(yasukereba ii to iu wake de wa arimasen)\nIt is not that cheaper is always better"
      }
    ],
    "vocabulary": [
      {
        "japanese": "賛成する",
        "romaji": "sansei suru",
        "english": "to agree"
      },
      {
        "japanese": "反対する",
        "romaji": "hantai suru",
        "english": "to oppose"
      },
      {
        "japanese": "提案",
        "romaji": "teian",
        "english": "proposal"
      },
      {
        "japanese": "判断",
        "romaji": "handan",
        "english": "judgment, decision"
      },
      {
        "japanese": "慎重",
        "romaji": "shinchou",
        "english": "careful, prudent"
      },
      {
        "japanese": "誤解",
        "romaji": "gokai",
        "english": "misunderstanding"
      },
      {
        "japanese": "事情",
        "romaji": "jijou",
        "english": "circumstances"
      },
      {
        "japanese": "対応する",
        "romaji": "taiou suru",
        "english": "to respond, handle"
      }
    ]
  },
  "35": {
    "grammar": [
      {
        "title": "〜べきだ",
        "description": "Use 〜べきだ to state what should be done from the speaker’s perspective.\nIt expresses duty, advice, or strong expectation.",
        "example": "重要な点は 先に確認すべきです\n(juuyou na ten wa saki ni kakunin subeki desu)\nImportant points should be checked first"
      },
      {
        "title": "〜に違いない",
        "description": "Use 〜に違いない when you are convinced something must be true.\n\"must surely ~\"",
        "example": "こんなに静かなら もう寝たに違いありません\n(konna ni shizuka nara mou neta ni chigai arimasen)\nIt must be that they already went to sleep"
      }
    ],
    "vocabulary": [
      {
        "japanese": "検討する",
        "romaji": "kentou suru",
        "english": "to consider"
      },
      {
        "japanese": "効率",
        "romaji": "kouritsu",
        "english": "efficiency"
      },
      {
        "japanese": "義務",
        "romaji": "gimu",
        "english": "duty, obligation"
      },
      {
        "japanese": "証拠",
        "romaji": "shouko",
        "english": "evidence"
      },
      {
        "japanese": "責任感",
        "romaji": "sekininkan",
        "english": "sense of responsibility"
      },
      {
        "japanese": "改善策",
        "romaji": "kaizensaku",
        "english": "improvement measure"
      },
      {
        "japanese": "結論",
        "romaji": "ketsuron",
        "english": "conclusion"
      },
      {
        "japanese": "豊富",
        "romaji": "houfu",
        "english": "abundant, rich"
      }
    ]
  },
  "36": {
    "grammar": [
      {
        "title": "〜ものの",
        "description": "Use 〜ものの for a written or formal contrast.\n\"although ~\"",
        "example": "計画はあるものの 実行は簡単ではありません\n(keikaku wa aru mono no jikkou wa kantan de wa arimasen)\nAlthough there is a plan, carrying it out is not easy"
      },
      {
        "title": "〜とはいえ",
        "description": "Use 〜とはいえ to add a concession such as \"though it may be said that.\"\nIt softens a claim by acknowledging another side.",
        "example": "便利とはいえ 使いすぎはよくありません\n(benri to wa ie tsukaisugi wa yokuarimasen)\nThough it is convenient, overusing it is not good"
      }
    ],
    "vocabulary": [
      {
        "japanese": "挑戦する",
        "romaji": "chousen suru",
        "english": "to challenge oneself"
      },
      {
        "japanese": "現状",
        "romaji": "genjou",
        "english": "current state"
      },
      {
        "japanese": "理想",
        "romaji": "risou",
        "english": "ideal"
      },
      {
        "japanese": "妥協",
        "romaji": "dakyou",
        "english": "compromise"
      },
      {
        "japanese": "実績",
        "romaji": "jisseki",
        "english": "record, achievements"
      },
      {
        "japanese": "評価",
        "romaji": "hyouka",
        "english": "evaluation"
      },
      {
        "japanese": "名目",
        "romaji": "meimoku",
        "english": "name, pretext"
      },
      {
        "japanese": "実行",
        "romaji": "jikkou",
        "english": "execution, carrying out"
      }
    ]
  },
  "37": {
    "grammar": [
      {
        "title": "〜にもかかわらず",
        "description": "Use 〜にもかかわらず for a strong contrast similar to \"despite\" or \"in spite of.\"\nIt is more formal than のに.",
        "example": "雨にもかかわらず 試合は 続きました\n(ame ni mo kakawarazu shiai wa tsuzukimashita)\nThe game continued despite the rain"
      },
      {
        "title": "〜ことなく",
        "description": "Use 〜ことなく in formal Japanese to mean \"without doing.\"\nIt often appears in essays and reports.",
        "example": "彼は 休むことなく 働き続けました\n(kare wa yasumu koto naku hatarakitsuzukemashita)\nHe kept working without taking a break"
      }
    ],
    "vocabulary": [
      {
        "japanese": "試合",
        "romaji": "shiai",
        "english": "match, game"
      },
      {
        "japanese": "継続する",
        "romaji": "keizoku suru",
        "english": "to continue"
      },
      {
        "japanese": "中断する",
        "romaji": "chuudan suru",
        "english": "to interrupt, suspend"
      },
      {
        "japanese": "裏切る",
        "romaji": "uragiru",
        "english": "to betray"
      },
      {
        "japanese": "犠牲",
        "romaji": "gisei",
        "english": "sacrifice"
      },
      {
        "japanese": "兆し",
        "romaji": "kizashi",
        "english": "sign, indication"
      },
      {
        "japanese": "冷静",
        "romaji": "reisei",
        "english": "calm, composed"
      },
      {
        "japanese": "依然として",
        "romaji": "izen to shite",
        "english": "still, as before"
      }
    ]
  },
  "38": {
    "grammar": [
      {
        "title": "〜ざるをえない",
        "description": "Use 〜ざるをえない to say there is no choice but to do something.\nIt is a formal, strong expression of necessity.",
        "example": "大切な会議なので 行かざるをえません\n(taisetsu na kaigi na no de ikazaru o emasen)\nBecause it is an important meeting, I have no choice but to go"
      },
      {
        "title": "〜ずにはいられない",
        "description": "Use 〜ずにはいられない when you cannot help doing something because of emotion or impulse.\n\"cannot help but ~\"",
        "example": "その話を聞くと 笑わずにはいられません\n(sono hanashi o kiku to warawazu ni wa iraremasen)\nWhen I hear that story, I cannot help laughing"
      }
    ],
    "vocabulary": [
      {
        "japanese": "義務",
        "romaji": "gimu",
        "english": "obligation"
      },
      {
        "japanese": "衝動",
        "romaji": "shoudou",
        "english": "impulse"
      },
      {
        "japanese": "本音",
        "romaji": "honne",
        "english": "true feelings"
      },
      {
        "japanese": "建前",
        "romaji": "tatemae",
        "english": "public stance"
      },
      {
        "japanese": "納得する",
        "romaji": "nattoku suru",
        "english": "to be convinced"
      },
      {
        "japanese": "我慢する",
        "romaji": "gaman suru",
        "english": "to endure"
      },
      {
        "japanese": "断念する",
        "romaji": "dannen suru",
        "english": "to abandon"
      },
      {
        "japanese": "圧力",
        "romaji": "atsuryoku",
        "english": "pressure"
      }
    ]
  },
  "39": {
    "grammar": [
      {
        "title": "〜かねない",
        "description": "Use 〜かねない for a real risk that something bad may happen.\n\"might easily ~\"",
        "example": "油断すると 大きな事故に なりかねません\n(yudan suru to ookina jiko ni narikanemasen)\nIf you let your guard down, it could lead to a serious accident"
      },
      {
        "title": "〜にすぎない",
        "description": "Use 〜にすぎない to say something is no more than that.\nIt downplays degree or importance.",
        "example": "それは 単なる うわさにすぎません\n(sore wa tannaru uwasa ni sugimasen)\nThat is nothing more than a rumor"
      }
    ],
    "vocabulary": [
      {
        "japanese": "失敗",
        "romaji": "shippai",
        "english": "failure"
      },
      {
        "japanese": "過信する",
        "romaji": "kashin suru",
        "english": "to be overconfident"
      },
      {
        "japanese": "単なる",
        "romaji": "tannaru",
        "english": "mere, nothing but"
      },
      {
        "japanese": "手段",
        "romaji": "shudan",
        "english": "means, method"
      },
      {
        "japanese": "誤差",
        "romaji": "gosa",
        "english": "margin of error"
      },
      {
        "japanese": "油断",
        "romaji": "yudan",
        "english": "carelessness"
      },
      {
        "japanese": "危機",
        "romaji": "kiki",
        "english": "crisis"
      },
      {
        "japanese": "兆候",
        "romaji": "choukou",
        "english": "sign, symptom"
      }
    ]
  },
  "40": {
    "grammar": [
      {
        "title": "〜というものだ",
        "description": "Use 〜というものだ to present a general truth, a strong judgment, or \"that is exactly what ~ means.\"\nIt often sounds essay-like.",
        "example": "努力してこそ 成長できるというものです\n(doryoku shite koso seichou dekiru to iu mono desu)\nYou can say real growth comes only through effort"
      },
      {
        "title": "〜に至っては",
        "description": "Use 〜に至っては when narrowing in on an extreme case or especially notable example.\n\"when it comes to ~\"",
        "example": "交通費に至っては 会社が全額負担します\n(koutsuuhi ni itatte wa kaisha ga zengaku futan shimasu)\nWhen it comes to travel costs, the company pays the full amount"
      }
    ],
    "vocabulary": [
      {
        "japanese": "本質",
        "romaji": "honshitsu",
        "english": "essence"
      },
      {
        "japanese": "観点",
        "romaji": "kanten",
        "english": "point of view"
      },
      {
        "japanese": "価値観",
        "romaji": "kachikan",
        "english": "values, sense of values"
      },
      {
        "japanese": "哲学",
        "romaji": "tetsugaku",
        "english": "philosophy"
      },
      {
        "japanese": "文脈",
        "romaji": "bunmyaku",
        "english": "context"
      },
      {
        "japanese": "極端",
        "romaji": "kyokutan",
        "english": "extreme"
      },
      {
        "japanese": "議論",
        "romaji": "giron",
        "english": "discussion, argument"
      },
      {
        "japanese": "検証する",
        "romaji": "kenshou suru",
        "english": "to verify, examine"
      }
    ]
  }
};

export const advancedLessonData: AdvancedLessonData[] = [
  {
    "num": 26,
    "title": "時間があれば参加します",
    "english": "If I have time, I will join"
  },
  {
    "num": 27,
    "title": "時間があったら復習します",
    "english": "If I have time, I will review"
  },
  {
    "num": 28,
    "title": "先生にほめられました",
    "english": "I was praised by the teacher"
  },
  {
    "num": 29,
    "title": "子どもに野菜を食べさせます",
    "english": "I make the child eat vegetables"
  },
  {
    "num": 30,
    "title": "忘れないようにメモします",
    "english": "I take notes so I do not forget"
  },
  {
    "num": 31,
    "title": "部長がお戻りになります",
    "english": "The manager will return"
  },
  {
    "num": 32,
    "title": "資料を拝見いたします",
    "english": "I will look at the materials"
  },
  {
    "num": 33,
    "title": "会議は延期される見込みです",
    "english": "The meeting is expected to be postponed"
  },
  {
    "num": 34,
    "title": "この案には賛成しかねます",
    "english": "I cannot agree to this proposal"
  },
  {
    "num": 35,
    "title": "もっと検討すべきです",
    "english": "We should consider it more"
  },
  {
    "num": 36,
    "title": "難しいものの挑戦したいです",
    "english": "Although it is difficult, I want to try"
  },
  {
    "num": 37,
    "title": "雨にもかかわらず試合は続きました",
    "english": "The game continued despite the rain"
  },
  {
    "num": 38,
    "title": "行かざるをえません",
    "english": "I have no choice but to go"
  },
  {
    "num": 39,
    "title": "失敗しかねません",
    "english": "It may end in failure"
  },
  {
    "num": 40,
    "title": "人間というものは忘れやすいです",
    "english": "Human beings are apt to forget"
  }
];
