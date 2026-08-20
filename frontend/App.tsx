import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

type Screen = 'home' | 'lesson' | 'quiz' | 'result';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// JLPT roadmap: JPLingo content today only covers Minna No Nihongo lessons
// 1-25, which map (approximately, not officially) to N5 and N4. N3-N1 are
// shown as a visible, honest "planned" roadmap with no lesson content yet.
type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

interface JlptRoadmapEntry {
  level: JlptLevel;
  name: string;
  goal: string;
  topics: string[];
  available: boolean;
}

const JLPT_ROADMAP: JlptRoadmapEntry[] = [
  {
    level: 'N5',
    name: 'Beginner',
    goal: 'Read basic hiragana/katakana and build simple sentences.',
    topics: ['は / です sentences', 'Basic particles', 'Everyday vocabulary'],
    available: true,
  },
  {
    level: 'N4',
    name: 'Elementary',
    goal: 'Handle everyday conversations with more natural grammar.',
    topics: ['て-form requests', 'Giving & receiving', 'Past/plain forms'],
    available: true,
  },
  {
    level: 'N3',
    name: 'Intermediate',
    goal: 'Follow everyday Japanese at a natural pace.',
    topics: ['Conditional forms', 'Passive/causative basics', '~650 kanji'],
    available: false,
  },
  {
    level: 'N2',
    name: 'Upper-Intermediate',
    goal: 'Understand news, workplace Japanese, and abstract topics.',
    topics: ['Formal/keigo basics', 'Complex grammar', '~1000 kanji'],
    available: false,
  },
  {
    level: 'N1',
    name: 'Advanced',
    goal: 'Understand nuanced, academic, and literary Japanese.',
    topics: ['Advanced nuance', 'Business Japanese', '~2000 kanji'],
    available: false,
  },
];

const DAILY_GOAL_XP = 50;
const STARTING_HEARTS = 5;
const PASS_THRESHOLD = 70;

// Lesson content data based on Minna No Nihongo
const lessonContent: Record<number, {
  grammar: { title: string; description: string; example: string }[];
  vocabulary: { japanese: string; romaji: string; english: string }[];
}> = {
  1: {
    grammar: [
      {
        title: '～は～です',
        description: '[Topic] は [Noun] です\n"As for [topic], it is [noun]"',
        example: 'わたしは マイクミラーです\n(watashi wa Maiku Miraa desu)\nI am Mike Miller',
      },
      {
        title: '～じゃありません',
        description: '[Topic] は [Noun] じゃありません\nNegative form: "is not"',
        example: 'サントスさんは がくせいじゃありません\n(Santosu-san wa gakusei ja arimasen)\nMr. Santos is not a student',
      },
    ],
    vocabulary: [
      { japanese: 'わたし', romaji: 'watashi', english: 'I' },
      { japanese: 'あなた', romaji: 'anata', english: 'you' },
      { japanese: 'あのひと', romaji: 'ano hito', english: 'that person' },
      { japanese: 'せんせい', romaji: 'sensei', english: 'teacher' },
      { japanese: 'がくせい', romaji: 'gakusei', english: 'student' },
      { japanese: 'かいしゃいん', romaji: 'kaishain', english: 'company employee' },
      { japanese: 'しゃいん', romaji: 'shain', english: 'employee of ~' },
      { japanese: 'ぎんこういん', romaji: 'ginkouin', english: 'bank employee' },
      { japanese: 'いしゃ', romaji: 'isha', english: 'doctor' },
      { japanese: 'けんきゅうしゃ', romaji: 'kenkyuusha', english: 'researcher' },
    ],
  },
  2: {
    grammar: [
      {
        title: 'これ/それ/あれ',
        description: 'これ (this - near speaker), それ (that - near listener), あれ (that over there)\nDemonstrative pronouns',
        example: 'これは じしょです\n(kore wa jisho desu)\nThis is a dictionary',
      },
      {
        title: 'この/その/あの + Noun',
        description: 'この (this), その (that), あの (that over there) + Noun\nDemonstrative adjectives',
        example: 'この かさは だれのですか\n(kono kasa wa dare no desu ka)\nWhose umbrella is this?',
      },
    ],
    vocabulary: [
      { japanese: 'これ', romaji: 'kore', english: 'this (thing)' },
      { japanese: 'それ', romaji: 'sore', english: 'that (thing)' },
      { japanese: 'あれ', romaji: 'are', english: 'that over there' },
      { japanese: 'この', romaji: 'kono', english: 'this ~' },
      { japanese: 'その', romaji: 'sono', english: 'that ~' },
      { japanese: 'あの', romaji: 'ano', english: 'that ~ over there' },
      { japanese: 'ほん', romaji: 'hon', english: 'book' },
      { japanese: 'じしょ', romaji: 'jisho', english: 'dictionary' },
      { japanese: 'ざっし', romaji: 'zasshi', english: 'magazine' },
      { japanese: 'しんぶん', romaji: 'shinbun', english: 'newspaper' },
    ],
  },
  3: {
    grammar: [
      {
        title: 'ここ/そこ/あそこ',
        description: 'ここ (here), そこ (there), あそこ (over there)\nLocation demonstratives',
        example: 'トイレは あそこです\n(toire wa asoko desu)\nThe toilet is over there',
      },
      {
        title: '～は どこですか',
        description: '[Place] は どこですか\nAsking "Where is ~?"',
        example: 'エレベーターは どこですか\n(erebeetaa wa doko desu ka)\nWhere is the elevator?',
      },
    ],
    vocabulary: [
      { japanese: 'ここ', romaji: 'koko', english: 'here' },
      { japanese: 'そこ', romaji: 'soko', english: 'there' },
      { japanese: 'あそこ', romaji: 'asoko', english: 'over there' },
      { japanese: 'どこ', romaji: 'doko', english: 'where' },
      { japanese: 'トイレ', romaji: 'toire', english: 'toilet' },
      { japanese: 'かいだん', romaji: 'kaidan', english: 'stairs' },
      { japanese: 'エレベーター', romaji: 'erebeetaa', english: 'elevator' },
      { japanese: 'エスカレーター', romaji: 'esukareetaa', english: 'escalator' },
      { japanese: 'じどうはんばいき', romaji: 'jidouhanbaiki', english: 'vending machine' },
      { japanese: 'うけつけ', romaji: 'uketsuke', english: 'reception' },
    ],
  },
  4: {
    grammar: [
      {
        title: '～じ ～ふん',
        description: '～時 (hour) ～分 (minute)\nTelling time',
        example: 'いま ７じ１０ふんです\n(ima shichi-ji juppun desu)\nIt is 7:10 now',
      },
      {
        title: '～から ～まで',
        description: 'From ~ to ~\nTime or place range',
        example: 'ぎんこうは ９じから ３じまでです\n(ginkou wa ku-ji kara san-ji made desu)\nThe bank is from 9 to 3',
      },
    ],
    vocabulary: [
      { japanese: 'おきます', romaji: 'okimasu', english: 'to wake up' },
      { japanese: 'ねます', romaji: 'nemasu', english: 'to sleep' },
      { japanese: 'はたらきます', romaji: 'hatarakimasu', english: 'to work' },
      { japanese: 'やすみます', romaji: 'yasumimasu', english: 'to rest' },
      { japanese: 'べんきょうします', romaji: 'benkyou shimasu', english: 'to study' },
      { japanese: 'おわります', romaji: 'owarimasu', english: 'to finish' },
      { japanese: 'なんじ', romaji: 'nanji', english: 'what time' },
      { japanese: 'ごぜん', romaji: 'gozen', english: 'a.m.' },
      { japanese: 'ごご', romaji: 'gogo', english: 'p.m.' },
      { japanese: 'やすみ', romaji: 'yasumi', english: 'rest, holiday' },
    ],
  },
  5: {
    grammar: [
      {
        title: '～へ いきます/きます/かえります',
        description: '[Place] へ 行きます/来ます/帰ります\nDirection particle へ with motion verbs',
        example: 'きょうとへ いきます\n(Kyouto e ikimasu)\nI go to Kyoto',
      },
      {
        title: '～で いきます',
        description: '[Transportation] で [Place] へ 行きます\nMeans of transportation',
        example: 'でんしゃで いきます\n(densha de ikimasu)\nI go by train',
      },
    ],
    vocabulary: [
      { japanese: 'いきます', romaji: 'ikimasu', english: 'to go' },
      { japanese: 'きます', romaji: 'kimasu', english: 'to come' },
      { japanese: 'かえります', romaji: 'kaerimasu', english: 'to return' },
      { japanese: 'でんしゃ', romaji: 'densha', english: 'train' },
      { japanese: 'ちかてつ', romaji: 'chikatetsu', english: 'subway' },
      { japanese: 'しんかんせん', romaji: 'shinkansen', english: 'bullet train' },
      { japanese: 'バス', romaji: 'basu', english: 'bus' },
      { japanese: 'タクシー', romaji: 'takushii', english: 'taxi' },
      { japanese: 'じてんしゃ', romaji: 'jitensha', english: 'bicycle' },
      { japanese: 'あるいて', romaji: 'aruite', english: 'on foot' },
    ],
  },
  6: {
    grammar: [
      {
        title: '～を ～ます',
        description: '[Object] を [Verb] ます\nObject marker を',
        example: 'ごはんを たべます\n(gohan o tabemasu)\nI eat rice/meal',
      },
      {
        title: '～で ～ます (place)',
        description: '[Place] で [Action] ます\nPlace of action',
        example: 'えきで しんぶんを かいます\n(eki de shinbun o kaimasu)\nI buy a newspaper at the station',
      },
    ],
    vocabulary: [
      { japanese: 'たべます', romaji: 'tabemasu', english: 'to eat' },
      { japanese: 'のみます', romaji: 'nomimasu', english: 'to drink' },
      { japanese: 'すいます', romaji: 'suimasu', english: 'to smoke' },
      { japanese: 'みます', romaji: 'mimasu', english: 'to see, watch' },
      { japanese: 'ききます', romaji: 'kikimasu', english: 'to hear, listen' },
      { japanese: 'よみます', romaji: 'yomimasu', english: 'to read' },
      { japanese: 'かきます', romaji: 'kakimasu', english: 'to write' },
      { japanese: 'かいます', romaji: 'kaimasu', english: 'to buy' },
      { japanese: 'とります', romaji: 'torimasu', english: 'to take (photo)' },
      { japanese: 'します', romaji: 'shimasu', english: 'to do' },
    ],
  },
  7: {
    grammar: [
      {
        title: '～を あげます/もらいます',
        description: 'Giving and receiving verbs\n[Person] に [Thing] を あげます/もらいます',
        example: 'わたしは やまださんに はなを あげました\n(watashi wa Yamada-san ni hana o agemashita)\nI gave flowers to Mr. Yamada',
      },
      {
        title: '～で (tool/method)',
        description: '[Tool] で [Action]\nInstrument/method particle',
        example: 'はしで たべます\n(hashi de tabemasu)\nI eat with chopsticks',
      },
    ],
    vocabulary: [
      { japanese: 'あげます', romaji: 'agemasu', english: 'to give' },
      { japanese: 'もらいます', romaji: 'moraimasu', english: 'to receive' },
      { japanese: 'かします', romaji: 'kashimasu', english: 'to lend' },
      { japanese: 'かります', romaji: 'karimasu', english: 'to borrow' },
      { japanese: 'おしえます', romaji: 'oshiemasu', english: 'to teach' },
      { japanese: 'ならいます', romaji: 'naraimasu', english: 'to learn' },
      { japanese: 'かけます', romaji: 'kakemasu', english: 'to make (phone call)' },
      { japanese: 'て', romaji: 'te', english: 'hand' },
      { japanese: 'はし', romaji: 'hashi', english: 'chopsticks' },
      { japanese: 'スプーン', romaji: 'supuun', english: 'spoon' },
    ],
  },
  8: {
    grammar: [
      {
        title: 'い-adjective',
        description: 'Adjectives ending in い\nDirect modification before nouns',
        example: 'これは たかい くつです\n(kore wa takai kutsu desu)\nThese are expensive shoes',
      },
      {
        title: 'な-adjective',
        description: 'Adjectives that require な before nouns',
        example: 'さくらは きれいな はなです\n(sakura wa kirei na hana desu)\nCherry blossoms are beautiful flowers',
      },
    ],
    vocabulary: [
      { japanese: 'おおきい', romaji: 'ookii', english: 'big' },
      { japanese: 'ちいさい', romaji: 'chiisai', english: 'small' },
      { japanese: 'あたらしい', romaji: 'atarashii', english: 'new' },
      { japanese: 'ふるい', romaji: 'furui', english: 'old' },
      { japanese: 'いい', romaji: 'ii', english: 'good' },
      { japanese: 'わるい', romaji: 'warui', english: 'bad' },
      { japanese: 'きれい', romaji: 'kirei', english: 'beautiful, clean' },
      { japanese: 'ゆうめい', romaji: 'yuumei', english: 'famous' },
      { japanese: 'しずか', romaji: 'shizuka', english: 'quiet' },
      { japanese: 'にぎやか', romaji: 'nigiyaka', english: 'lively' },
    ],
  },
  9: {
    grammar: [
      {
        title: '～が すきです/きらいです',
        description: '[Thing] が 好き/嫌い です\nExpressing likes and dislikes',
        example: 'わたしは イタリアりょうりが すきです\n(watashi wa Itaria-ryouri ga suki desu)\nI like Italian food',
      },
      {
        title: '～が じょうずです/へたです',
        description: '[Thing] が 上手/下手 です\nExpressing skill level',
        example: 'ワンさんは にほんごが じょうずです\n(Wan-san wa nihongo ga jouzu desu)\nMr. Wang is good at Japanese',
      },
    ],
    vocabulary: [
      { japanese: 'すき', romaji: 'suki', english: 'like' },
      { japanese: 'だいすき', romaji: 'daisuki', english: 'love, like very much' },
      { japanese: 'きらい', romaji: 'kirai', english: 'dislike' },
      { japanese: 'じょうず', romaji: 'jouzu', english: 'good at, skillful' },
      { japanese: 'へた', romaji: 'heta', english: 'bad at, poor' },
      { japanese: 'りょうり', romaji: 'ryouri', english: 'cooking, dish' },
      { japanese: 'のみもの', romaji: 'nomimono', english: 'drink' },
      { japanese: 'スポーツ', romaji: 'supootsu', english: 'sports' },
      { japanese: 'やきゅう', romaji: 'yakyuu', english: 'baseball' },
      { japanese: 'おんがく', romaji: 'ongaku', english: 'music' },
    ],
  },
  10: {
    grammar: [
      {
        title: '～に ～が あります/います',
        description: '[Place] に [Thing/Person] が あります/います\nExistence expressions',
        example: 'つくえの うえに ほんが あります\n(tsukue no ue ni hon ga arimasu)\nThere is a book on the desk',
      },
      {
        title: '～は ～に あります/います',
        description: '[Thing/Person] は [Place] に あります/います\nLocation of known items',
        example: 'やまださんは きょうしつに います\n(Yamada-san wa kyoushitsu ni imasu)\nMr. Yamada is in the classroom',
      },
    ],
    vocabulary: [
      { japanese: 'あります', romaji: 'arimasu', english: 'to exist (things)' },
      { japanese: 'います', romaji: 'imasu', english: 'to exist (living)' },
      { japanese: 'うえ', romaji: 'ue', english: 'on, above' },
      { japanese: 'した', romaji: 'shita', english: 'under, below' },
      { japanese: 'まえ', romaji: 'mae', english: 'in front of' },
      { japanese: 'うしろ', romaji: 'ushiro', english: 'behind' },
      { japanese: 'みぎ', romaji: 'migi', english: 'right' },
      { japanese: 'ひだり', romaji: 'hidari', english: 'left' },
      { japanese: 'なか', romaji: 'naka', english: 'inside' },
      { japanese: 'そと', romaji: 'soto', english: 'outside' },
    ],
  },
  11: {
    grammar: [
      {
        title: 'Counters ～つ',
        description: 'General counter: ひとつ, ふたつ, みっつ...\nUsed for various small objects',
        example: 'みかんを ふたつ ください\n(mikan o futatsu kudasai)\nTwo oranges, please',
      },
      {
        title: '～人/枚/台',
        description: '人 (people), 枚 (flat things), 台 (machines/cars)\nSpecific counters',
        example: 'こどもが ３にん います\n(kodomo ga san-nin imasu)\nThere are 3 children',
      },
    ],
    vocabulary: [
      { japanese: 'ひとつ', romaji: 'hitotsu', english: 'one (thing)' },
      { japanese: 'ふたつ', romaji: 'futatsu', english: 'two (things)' },
      { japanese: 'みっつ', romaji: 'mittsu', english: 'three (things)' },
      { japanese: 'よっつ', romaji: 'yottsu', english: 'four (things)' },
      { japanese: 'いつつ', romaji: 'itsutsu', english: 'five (things)' },
      { japanese: 'ひとり', romaji: 'hitori', english: 'one person' },
      { japanese: 'ふたり', romaji: 'futari', english: 'two people' },
      { japanese: 'いちまい', romaji: 'ichi-mai', english: 'one (flat thing)' },
      { japanese: 'いちだい', romaji: 'ichi-dai', english: 'one (machine)' },
      { japanese: 'いっぽん', romaji: 'ippon', english: 'one (long thing)' },
    ],
  },
  12: {
    grammar: [
      {
        title: '～かったです (i-adj past)',
        description: 'Past tense of い-adjectives\nい → かったです',
        example: 'きのうは さむかったです\n(kinou wa samukatta desu)\nYesterday was cold',
      },
      {
        title: '～でした (na-adj past)',
        description: 'Past tense of な-adjectives\n[Adj]でした',
        example: 'しけんは かんたんでした\n(shiken wa kantan deshita)\nThe exam was easy',
      },
    ],
    vocabulary: [
      { japanese: 'あつい', romaji: 'atsui', english: 'hot' },
      { japanese: 'さむい', romaji: 'samui', english: 'cold' },
      { japanese: 'たのしい', romaji: 'tanoshii', english: 'fun' },
      { japanese: 'むずかしい', romaji: 'muzukashii', english: 'difficult' },
      { japanese: 'やさしい', romaji: 'yasashii', english: 'easy, kind' },
      { japanese: 'おいしい', romaji: 'oishii', english: 'delicious' },
      { japanese: 'まずい', romaji: 'mazui', english: 'bad tasting' },
      { japanese: 'かんたん', romaji: 'kantan', english: 'easy, simple' },
      { japanese: 'たいへん', romaji: 'taihen', english: 'tough, hard' },
      { japanese: 'ひま', romaji: 'hima', english: 'free (time)' },
    ],
  },
  13: {
    grammar: [
      {
        title: '～たいです',
        description: 'Expressing desire: "want to ~"\nVerb stem + たいです',
        example: 'にほんへ いきたいです\n(Nihon e ikitai desu)\nI want to go to Japan',
      },
      {
        title: '～に いきます/きます',
        description: '[Purpose] に 行きます/来ます\nGoing/coming for a purpose',
        example: 'ひるごはんを たべに いきます\n(hirugohan o tabe ni ikimasu)\nI go to eat lunch',
      },
    ],
    vocabulary: [
      { japanese: 'あそびます', romaji: 'asobimasu', english: 'to play' },
      { japanese: 'およぎます', romaji: 'oyogimasu', english: 'to swim' },
      { japanese: 'むかえます', romaji: 'mukaemasu', english: 'to meet (welcome)' },
      { japanese: 'つかれます', romaji: 'tsukaremasu', english: 'to get tired' },
      { japanese: 'けっこんします', romaji: 'kekkon shimasu', english: 'to get married' },
      { japanese: 'かいものします', romaji: 'kaimono shimasu', english: 'to shop' },
      { japanese: 'さんぽします', romaji: 'sanpo shimasu', english: 'to take a walk' },
      { japanese: 'しょくじします', romaji: 'shokuji shimasu', english: 'to have a meal' },
      { japanese: 'どこか', romaji: 'dokoka', english: 'somewhere' },
      { japanese: 'なにか', romaji: 'nanika', english: 'something' },
    ],
  },
  14: {
    grammar: [
      {
        title: 'て-form',
        description: 'Verb te-form for connecting actions\nUsed for requests, giving reasons',
        example: 'かいて、よんで、はなします\n(kaite, yonde, hanashimasu)\nWrite, read, and speak',
      },
      {
        title: '～てください',
        description: 'Polite request: "Please ~"\n[て-form] ください',
        example: 'すみません、ちょっと まってください\n(sumimasen, chotto matte kudasai)\nExcuse me, please wait a moment',
      },
    ],
    vocabulary: [
      { japanese: 'つけます', romaji: 'tsukemasu', english: 'to turn on' },
      { japanese: 'けします', romaji: 'keshimasu', english: 'to turn off' },
      { japanese: 'あけます', romaji: 'akemasu', english: 'to open' },
      { japanese: 'しめます', romaji: 'shimemasu', english: 'to close' },
      { japanese: 'いそぎます', romaji: 'isogimasu', english: 'to hurry' },
      { japanese: 'まちます', romaji: 'machimasu', english: 'to wait' },
      { japanese: 'とめます', romaji: 'tomemasu', english: 'to stop' },
      { japanese: 'まがります', romaji: 'magarimasu', english: 'to turn' },
      { japanese: 'もちます', romaji: 'mochimasu', english: 'to hold' },
      { japanese: 'とります', romaji: 'torimasu', english: 'to take' },
    ],
  },
  15: {
    grammar: [
      {
        title: '～てもいいですか',
        description: 'Asking permission: "May I ~?"\n[て-form] もいいですか',
        example: 'ここで しゃしんを とってもいいですか\n(koko de shashin o totte mo ii desu ka)\nMay I take a photo here?',
      },
      {
        title: '～てはいけません',
        description: 'Prohibition: "Must not ~"\n[て-form] はいけません',
        example: 'ここで たべてはいけません\n(koko de tabete wa ikemasen)\nYou must not eat here',
      },
    ],
    vocabulary: [
      { japanese: 'おきます', romaji: 'okimasu', english: 'to put' },
      { japanese: 'つくります', romaji: 'tsukurimasu', english: 'to make' },
      { japanese: 'うります', romaji: 'urimasu', english: 'to sell' },
      { japanese: 'しります', romaji: 'shirimasu', english: 'to know' },
      { japanese: 'すみます', romaji: 'sumimasu', english: 'to live' },
      { japanese: 'けんきゅうします', romaji: 'kenkyuu shimasu', english: 'to research' },
      { japanese: 'しりょう', romaji: 'shiryou', english: 'materials' },
      { japanese: 'カタログ', romaji: 'katarogu', english: 'catalog' },
      { japanese: 'じかん', romaji: 'jikan', english: 'time' },
      { japanese: 'よてい', romaji: 'yotei', english: 'schedule' },
    ],
  },
  16: {
    grammar: [
      {
        title: '～て、～て、～ます',
        description: 'Connecting actions in sequence\n[て-form]、[て-form]、[Verb]ます',
        example: 'あさ おきて、シャワーを あびて、あさごはんを たべます\n(asa okite, shawaa o abite, asagohan o tabemasu)\nIn the morning, I wake up, take a shower, and eat breakfast',
      },
      {
        title: '～てから',
        description: '"After doing ~"\n[て-form] から',
        example: 'しごとが おわってから、のみに いきます\n(shigoto ga owatte kara, nomi ni ikimasu)\nAfter work finishes, I go drinking',
      },
    ],
    vocabulary: [
      { japanese: 'のります', romaji: 'norimasu', english: 'to ride, get on' },
      { japanese: 'おります', romaji: 'orimasu', english: 'to get off' },
      { japanese: 'のりかえます', romaji: 'norikaemasu', english: 'to transfer' },
      { japanese: 'あびます', romaji: 'abimasu', english: 'to take (shower)' },
      { japanese: 'いれます', romaji: 'iremasu', english: 'to put in' },
      { japanese: 'だします', romaji: 'dashimasu', english: 'to take out' },
      { japanese: 'はいります', romaji: 'hairimasu', english: 'to enter' },
      { japanese: 'でます', romaji: 'demasu', english: 'to leave, exit' },
      { japanese: 'やめます', romaji: 'yamemasu', english: 'to quit' },
      { japanese: 'おします', romaji: 'oshimasu', english: 'to push' },
    ],
  },
  17: {
    grammar: [
      {
        title: '～ないでください',
        description: 'Negative request: "Please don\'t ~"\n[ない-form] でください',
        example: 'ここに くるまを とめないでください\n(koko ni kuruma o tomenaide kudasai)\nPlease don\'t park here',
      },
      {
        title: '～なければなりません',
        description: 'Obligation: "Must ~"\n[ない-form stem] ければなりません',
        example: 'くすりを のまなければなりません\n(kusuri o nomanakereba narimasen)\nI must take medicine',
      },
    ],
    vocabulary: [
      { japanese: 'おぼえます', romaji: 'oboemasu', english: 'to remember' },
      { japanese: 'わすれます', romaji: 'wasuremasu', english: 'to forget' },
      { japanese: 'なくします', romaji: 'nakushimasu', english: 'to lose' },
      { japanese: 'だします', romaji: 'dashimasu', english: 'to submit' },
      { japanese: 'はらいます', romaji: 'haraimasu', english: 'to pay' },
      { japanese: 'かえします', romaji: 'kaeshimasu', english: 'to return' },
      { japanese: 'でかけます', romaji: 'dekakemasu', english: 'to go out' },
      { japanese: 'ぬぎます', romaji: 'nugimasu', english: 'to take off' },
      { japanese: 'もっていきます', romaji: 'motte ikimasu', english: 'to take' },
      { japanese: 'もってきます', romaji: 'motte kimasu', english: 'to bring' },
    ],
  },
  18: {
    grammar: [
      {
        title: 'Dictionary form',
        description: 'Basic verb form (plain non-past)\nUsed before ことができます',
        example: 'にほんごを はなす\n(nihongo o hanasu)\nto speak Japanese',
      },
      {
        title: '～ことができます',
        description: 'Ability: "Can do ~"\n[Dictionary form] ことができます',
        example: 'かんじを よむことができます\n(kanji o yomu koto ga dekimasu)\nI can read kanji',
      },
    ],
    vocabulary: [
      { japanese: 'ひく', romaji: 'hiku', english: 'to play (piano)' },
      { japanese: 'うたう', romaji: 'utau', english: 'to sing' },
      { japanese: 'あつめる', romaji: 'atsumeru', english: 'to collect' },
      { japanese: 'すてる', romaji: 'suteru', english: 'to throw away' },
      { japanese: 'かえる', romaji: 'kaeru', english: 'to change' },
      { japanese: 'うんてんする', romaji: 'unten suru', english: 'to drive' },
      { japanese: 'よやくする', romaji: 'yoyaku suru', english: 'to reserve' },
      { japanese: 'けんがくする', romaji: 'kengaku suru', english: 'to visit (place)' },
      { japanese: 'ピアノ', romaji: 'piano', english: 'piano' },
      { japanese: 'しゅみ', romaji: 'shumi', english: 'hobby' },
    ],
  },
  19: {
    grammar: [
      {
        title: 'た-form',
        description: 'Verb past tense plain form\nUsed in ～たことがあります',
        example: 'たべた、のんだ、いった\n(tabeta, nonda, itta)\nate, drank, went',
      },
      {
        title: '～たことがあります',
        description: 'Experience: "Have done ~"\n[た-form] ことがあります',
        example: 'ふじさんに のぼったことがあります\n(Fuji-san ni nobotta koto ga arimasu)\nI have climbed Mt. Fuji',
      },
    ],
    vocabulary: [
      { japanese: 'のぼります', romaji: 'noborimasu', english: 'to climb' },
      { japanese: 'とまります', romaji: 'tomarimasu', english: 'to stay' },
      { japanese: 'そうじします', romaji: 'souji shimasu', english: 'to clean' },
      { japanese: 'せんたくします', romaji: 'sentaku shimasu', english: 'to do laundry' },
      { japanese: 'れんしゅうします', romaji: 'renshuu shimasu', english: 'to practice' },
      { japanese: 'りょこうします', romaji: 'ryokou shimasu', english: 'to travel' },
      { japanese: 'なります', romaji: 'narimasu', english: 'to become' },
      { japanese: 'ふじさん', romaji: 'Fuji-san', english: 'Mt. Fuji' },
      { japanese: 'おてら', romaji: 'o-tera', english: 'temple' },
      { japanese: 'じんじゃ', romaji: 'jinja', english: 'shrine' },
    ],
  },
  20: {
    grammar: [
      {
        title: 'Plain form (casual)',
        description: 'Casual speech forms\nUsed with friends, family, and in subordinate clauses',
        example: 'きょう いそがしい？\n(kyou isogashii?)\nAre you busy today? (casual)',
      },
      {
        title: '～と思います',
        description: 'Opinion: "I think that ~"\n[Plain form] と思います',
        example: 'あしたは はれると おもいます\n(ashita wa hareru to omoimasu)\nI think it will be sunny tomorrow',
      },
    ],
    vocabulary: [
      { japanese: 'いそがしい', romaji: 'isogashii', english: 'busy' },
      { japanese: 'ねむい', romaji: 'nemui', english: 'sleepy' },
      { japanese: 'つよい', romaji: 'tsuyoi', english: 'strong' },
      { japanese: 'よわい', romaji: 'yowai', english: 'weak' },
      { japanese: 'ちょうし', romaji: 'choushi', english: 'condition' },
      { japanese: 'ぐあい', romaji: 'guai', english: 'condition (health)' },
      { japanese: 'たぶん', romaji: 'tabun', english: 'probably' },
      { japanese: 'きっと', romaji: 'kitto', english: 'surely' },
      { japanese: 'ほんとうに', romaji: 'hontou ni', english: 'really' },
      { japanese: 'だいじょうぶ', romaji: 'daijoubu', english: 'all right' },
    ],
  },
  21: {
    grammar: [
      {
        title: '～と思います (quotation)',
        description: 'Expressing opinions and thoughts\n[Plain form] と思います',
        example: 'かれは こないと おもいます\n(kare wa konai to omoimasu)\nI think he won\'t come',
      },
      {
        title: '～と言います',
        description: 'Quotation: "~ says/said"\n[Quote] と言います',
        example: 'せんせいは あした テストがあると いいました\n(sensei wa ashita tesuto ga aru to iimashita)\nThe teacher said there\'s a test tomorrow',
      },
    ],
    vocabulary: [
      { japanese: 'おもいます', romaji: 'omoimasu', english: 'to think' },
      { japanese: 'いいます', romaji: 'iimasu', english: 'to say' },
      { japanese: 'しんじます', romaji: 'shinjimasu', english: 'to believe' },
      { japanese: 'しらべます', romaji: 'shirabemasu', english: 'to investigate' },
      { japanese: 'きをつけます', romaji: 'ki o tsukemasu', english: 'to be careful' },
      { japanese: 'まにあいます', romaji: 'ma ni aimasu', english: 'to be in time' },
      { japanese: 'ゆめ', romaji: 'yume', english: 'dream' },
      { japanese: 'しょうらい', romaji: 'shourai', english: 'future' },
      { japanese: 'けいかく', romaji: 'keikaku', english: 'plan' },
      { japanese: 'いけん', romaji: 'iken', english: 'opinion' },
    ],
  },
  22: {
    grammar: [
      {
        title: 'Noun modification',
        description: 'Modify nouns with plain form clauses\n[Plain form] + Noun',
        example: 'きのう かった ほん\n(kinou katta hon)\nthe book I bought yesterday',
      },
      {
        title: '～という',
        description: 'Naming: "called ~"\n[Name] という [Noun]',
        example: 'すし という りょうりを しっていますか\n(sushi to iu ryouri o shitte imasu ka)\nDo you know a dish called sushi?',
      },
    ],
    vocabulary: [
      { japanese: 'いみ', romaji: 'imi', english: 'meaning' },
      { japanese: 'おと', romaji: 'oto', english: 'sound' },
      { japanese: 'かたち', romaji: 'katachi', english: 'shape' },
      { japanese: 'いろ', romaji: 'iro', english: 'color' },
      { japanese: 'あじ', romaji: 'aji', english: 'taste' },
      { japanese: 'におい', romaji: 'nioi', english: 'smell' },
      { japanese: 'やくそく', romaji: 'yakusoku', english: 'promise' },
      { japanese: 'よてい', romaji: 'yotei', english: 'plan' },
      { japanese: 'ようじ', romaji: 'youji', english: 'business, errand' },
      { japanese: 'じゅんび', romaji: 'junbi', english: 'preparation' },
    ],
  },
  23: {
    grammar: [
      {
        title: '～とき',
        description: 'When ~, at the time of ~\n[Plain form/Noun の] とき',
        example: 'わからないとき、せんせいに ききます\n(wakaranai toki, sensei ni kikimasu)\nWhen I don\'t understand, I ask the teacher',
      },
      {
        title: '～と (conditional)',
        description: 'If/When ~ (natural consequence)\n[Plain form] と',
        example: 'このボタンを おすと、ドアが あきます\n(kono botan o osu to, doa ga akimasu)\nIf you press this button, the door opens',
      },
    ],
    vocabulary: [
      { japanese: 'わたります', romaji: 'watarimasu', english: 'to cross' },
      { japanese: 'きをつけます', romaji: 'ki o tsukemasu', english: 'to be careful' },
      { japanese: 'ひっこしします', romaji: 'hikkoshi shimasu', english: 'to move (house)' },
      { japanese: 'でんきをつけます', romaji: 'denki o tsukemasu', english: 'to turn on the light' },
      { japanese: 'でんきをけします', romaji: 'denki o keshimasu', english: 'to turn off the light' },
      { japanese: 'こうさてん', romaji: 'kousaten', english: 'intersection' },
      { japanese: 'しんごう', romaji: 'shingou', english: 'traffic light' },
      { japanese: 'かど', romaji: 'kado', english: 'corner' },
      { japanese: 'はし', romaji: 'hashi', english: 'bridge' },
      { japanese: 'ちゅうしゃじょう', romaji: 'chuushajou', english: 'parking lot' },
    ],
  },
  24: {
    grammar: [
      {
        title: '～てくれます/もらいます',
        description: 'Someone does something for me\n[Person] が [て-form] くれます/[Person] に [て-form] もらいます',
        example: 'ともだちが にほんごを おしえてくれました\n(tomodachi ga nihongo o oshiete kuremashita)\nMy friend taught me Japanese (for my benefit)',
      },
      {
        title: '～てあげます',
        description: 'I do something for someone\n[Person] に [て-form] あげます',
        example: 'おばあさんの にもつを もってあげました\n(obaasan no nimotsu o motte agemashita)\nI carried the old lady\'s luggage (for her)',
      },
    ],
    vocabulary: [
      { japanese: 'てつだいます', romaji: 'tetsudaimasu', english: 'to help' },
      { japanese: 'おくります', romaji: 'okurimasu', english: 'to send, escort' },
      { japanese: 'しょうかいします', romaji: 'shoukai shimasu', english: 'to introduce' },
      { japanese: 'あんないします', romaji: 'annai shimasu', english: 'to guide' },
      { japanese: 'せつめいします', romaji: 'setsumei shimasu', english: 'to explain' },
      { japanese: 'おじいさん', romaji: 'ojiisan', english: 'grandfather, old man' },
      { japanese: 'おばあさん', romaji: 'obaasan', english: 'grandmother, old lady' },
      { japanese: 'じゅんびします', romaji: 'junbi shimasu', english: 'to prepare' },
      { japanese: 'そうだんします', romaji: 'soudan shimasu', english: 'to consult' },
      { japanese: 'かたづけます', romaji: 'katazukemasu', english: 'to tidy up' },
    ],
  },
  25: {
    grammar: [
      {
        title: '～たら',
        description: 'If/When ~ (completed action)\n[た-form] ら',
        example: 'うちに かえったら、でんわしてください\n(uchi ni kaettara, denwa shite kudasai)\nPlease call me when you get home',
      },
      {
        title: '～ても',
        description: 'Even if ~\n[て-form] も',
        example: 'あめが ふっても、サッカーを します\n(ame ga futte mo, sakkaa o shimasu)\nEven if it rains, I\'ll play soccer',
      },
    ],
    vocabulary: [
      { japanese: 'もし', romaji: 'moshi', english: 'if' },
      { japanese: 'いくら', romaji: 'ikura', english: 'how much, no matter how' },
      { japanese: 'いつも', romaji: 'itsumo', english: 'always' },
      { japanese: 'ときどき', romaji: 'tokidoki', english: 'sometimes' },
      { japanese: 'たいてい', romaji: 'taitei', english: 'usually' },
      { japanese: 'せわになります', romaji: 'sewa ni narimasu', english: 'to be indebted' },
      { japanese: 'おれいをいいます', romaji: 'orei o iimasu', english: 'to thank' },
      { japanese: 'きにいります', romaji: 'ki ni irimasu', english: 'to like, be fond of' },
      { japanese: 'やくにたちます', romaji: 'yaku ni tachimasu', english: 'to be useful' },
      { japanese: 'おかげさまで', romaji: 'okagesama de', english: 'thanks to you' },
    ],
  },
};

// Function to generate quiz questions from lesson content
const generateQuizQuestions = (lessonNum: number): QuizQuestion[] => {
  const content = lessonContent[lessonNum] || lessonContent[1];
  const questions: QuizQuestion[] = [];
  
  // Helper function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get wrong answers from other lessons to ensure variety
  const getWrongAnswersFromOtherLessons = (correctAnswer: string, type: 'vocab' | 'grammar'): string[] => {
    const wrongAnswers: string[] = [];
    const lessons = Object.keys(lessonContent).map(Number).filter(n => n !== lessonNum);
    
    for (const lesson of shuffleArray(lessons)) {
      if (wrongAnswers.length >= 3) break;
      const otherContent = lessonContent[lesson];
      if (type === 'vocab') {
        for (const v of shuffleArray(otherContent.vocabulary)) {
          if (v.english !== correctAnswer && !wrongAnswers.includes(v.english)) {
            wrongAnswers.push(v.english);
            if (wrongAnswers.length >= 3) break;
          }
        }
      } else {
        for (const g of shuffleArray(otherContent.grammar)) {
          if (g.title !== correctAnswer && !wrongAnswers.includes(g.title)) {
            wrongAnswers.push(g.title);
            if (wrongAnswers.length >= 3) break;
          }
        }
      }
    }
    return wrongAnswers;
  };

  // Question Type 1: Japanese → English (vocabulary)
  const vocabForJpToEn = shuffleArray(content.vocabulary).slice(0, 2);
  vocabForJpToEn.forEach((vocab) => {
    const correctAnswer = vocab.english;
    
    // Get wrong answers from same lesson first
    let wrongAnswers = content.vocabulary
      .filter(v => v.english !== vocab.english)
      .map(v => v.english);
    
    // If not enough, get from other lessons
    if (wrongAnswers.length < 3) {
      wrongAnswers = [...wrongAnswers, ...getWrongAnswersFromOtherLessons(correctAnswer, 'vocab')];
    }
    
    // Take 3 wrong answers
    const selectedWrong = shuffleArray(wrongAnswers).slice(0, 3);
    
    // Combine and shuffle
    const allOptions = shuffleArray([correctAnswer, ...selectedWrong]);
    const correctIndex = allOptions.indexOf(correctAnswer);
    
    questions.push({
      id: questions.length + 1,
      question: `What does "${vocab.japanese}" mean?`,
      options: allOptions,
      correctAnswer: correctIndex,
      explanation: `${vocab.japanese} (${vocab.romaji}) means "${vocab.english}"`,
    });
  });

  // Question Type 2: English → Japanese (vocabulary)
  const vocabForEnToJp = shuffleArray(content.vocabulary.filter(v => 
    !vocabForJpToEn.some(used => used.japanese === v.japanese)
  )).slice(0, 1);
  
  vocabForEnToJp.forEach((vocab) => {
    const correctAnswer = vocab.japanese;
    
    // Get wrong answers from same lesson
    let wrongAnswers = content.vocabulary
      .filter(v => v.japanese !== vocab.japanese)
      .map(v => v.japanese);
    
    // If not enough, get from other lessons
    if (wrongAnswers.length < 3) {
      const lessons = Object.keys(lessonContent).map(Number).filter(n => n !== lessonNum);
      for (const lesson of shuffleArray(lessons)) {
        if (wrongAnswers.length >= 3) break;
        const otherContent = lessonContent[lesson];
        for (const v of shuffleArray(otherContent.vocabulary)) {
          if (v.japanese !== correctAnswer && !wrongAnswers.includes(v.japanese)) {
            wrongAnswers.push(v.japanese);
            if (wrongAnswers.length >= 3) break;
          }
        }
      }
    }
    
    const selectedWrong = shuffleArray(wrongAnswers).slice(0, 3);
    const allOptions = shuffleArray([correctAnswer, ...selectedWrong]);
    const correctIndex = allOptions.indexOf(correctAnswer);
    
    questions.push({
      id: questions.length + 1,
      question: `How do you say "${vocab.english}" in Japanese?`,
      options: allOptions,
      correctAnswer: correctIndex,
      explanation: `"${vocab.english}" in Japanese is ${vocab.japanese} (${vocab.romaji})`,
    });
  });

  // Question Type 3: Grammar pattern identification
  const grammarQuestions = shuffleArray(content.grammar).slice(0, 2);
  grammarQuestions.forEach((grammar) => {
    const correctAnswer = grammar.title;
    
    // Get wrong answers
    let wrongAnswers = content.grammar
      .filter(g => g.title !== grammar.title)
      .map(g => g.title);
    
    if (wrongAnswers.length < 3) {
      wrongAnswers = [...wrongAnswers, ...getWrongAnswersFromOtherLessons(correctAnswer, 'grammar')];
    }
    
    const selectedWrong = shuffleArray(wrongAnswers).slice(0, 3);
    const allOptions = shuffleArray([correctAnswer, ...selectedWrong]);
    const correctIndex = allOptions.indexOf(correctAnswer);
    
    questions.push({
      id: questions.length + 1,
      question: `Which grammar pattern means: "${grammar.description.split('\n')[0]}"?`,
      options: allOptions,
      correctAnswer: correctIndex,
      explanation: `${grammar.title}: ${grammar.description}`,
    });
  });

  // Return exactly 5 questions, shuffled
  return shuffleArray(questions).slice(0, 5);
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you say "I" in Japanese?',
    options: ['せんせい', 'わたし', 'がくせい', 'です'],
    correctAnswer: 1,
    explanation: 'わたし (watashi) means "I" or "me"',
  },
  {
    id: 2,
    question: 'What does "がくせい" mean?',
    options: ['teacher', 'student', 'book', 'school'],
    correctAnswer: 1,
    explanation: 'がくせい (gakusei) means "student"',
  },
  {
    id: 3,
    question: 'Complete: わたし___ がくせいです',
    options: ['の', 'が', 'は', 'を'],
    correctAnswer: 2,
    explanation: 'は (wa) is the topic marker. わたしは がくせいです = I am a student',
  },
  {
    id: 4,
    question: 'How do you say "is not" (negative)?',
    options: ['です', 'ですか', 'じゃありません', 'ありがとう'],
    correctAnswer: 2,
    explanation: 'じゃありません (ja arimasen) is the negative form of です',
  },
  {
    id: 5,
    question: 'What does "せんせい" mean?',
    options: ['student', 'doctor', 'teacher', 'friend'],
    correctAnswer: 2,
    explanation: 'せんせい (sensei) means "teacher"',
  },
];

// Lesson data for the 25 lessons that exist today. `jlptLevel` mirrors the
// backend's approximation: lessons 1-15 (core elementary grammar) map to N5,
// lessons 16-25 (more complex structures) map to N4. See README for caveats.
const deriveJlptLevel = (lessonNum: number): JlptLevel =>
  lessonNum <= 15 ? 'N5' : 'N4';

const lessonData = [
  { num: 1, title: 'はじめまして', english: 'Nice to meet you' },
  { num: 2, title: 'これは何ですか', english: 'What is this?' },
  { num: 3, title: 'ここは郵便局です', english: 'This is a post office' },
  { num: 4, title: '今何時ですか', english: 'What time is it?' },
  { num: 5, title: '京都へ行きます', english: 'Going to Kyoto' },
  { num: 6, title: 'いっしょに行きませんか', english: "Won't you go together?" },
  { num: 7, title: '何であげますか', english: 'How will you give it?' },
  { num: 8, title: 'マリアさんはきれいです', english: 'Maria is beautiful' },
  { num: 9, title: '好きな食べ物は何ですか', english: 'What food do you like?' },
  { num: 10, title: 'あそこに男の人がいます', english: "There's a man over there" },
  { num: 11, title: 'りんごが四つあります', english: 'There are four apples' },
  { num: 12, title: '昨日は寒かったです', english: 'Yesterday was cold' },
  { num: 13, title: '別々にお願いします', english: 'Separately, please' },
  { num: 14, title: 'ちょっと待ってください', english: 'Please wait a moment' },
  { num: 15, title: '写真を撮ってもいいですか', english: 'May I take photos?' },
  { num: 16, title: '使い方を教えてください', english: 'Please teach me how to use it' },
  { num: 17, title: 'どうしましたか', english: 'What happened?' },
  { num: 18, title: '趣味は何ですか', english: 'What are your hobbies?' },
  { num: 19, title: '相撲を見たことがありますか', english: 'Have you seen sumo?' },
  { num: 20, title: '夏休みはどうでしたか', english: 'How was summer vacation?' },
  { num: 21, title: 'どう思いますか', english: 'What do you think?' },
  { num: 22, title: 'どんな部屋がいいですか', english: 'What kind of room is good?' },
  { num: 23, title: 'どうやって行きますか', english: 'How do you get there?' },
  { num: 24, title: '手伝いましょうか', english: 'Shall I help?' },
  { num: 25, title: 'いろいろお世話になりました', english: 'Thank you for everything' },
].map(lesson => ({ ...lesson, jlptLevel: deriveJlptLevel(lesson.num) }));

const App = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [xp, setXp] = useState(0);
  const [dailyXp, setDailyXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hasLoggedStreakToday, setHasLoggedStreakToday] = useState(false);
  const [hearts, setHearts] = useState(STARTING_HEARTS);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>('N5');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<
    QuizQuestion[]
  >([]);

  // A lesson is unlocked if it is the very first lesson, or the lesson
  // immediately before it has already been passed. This makes the lesson
  // path progress step by step instead of unlocking everything up front.
  const isLessonUnlocked = (lessonNum: number) =>
    lessonNum === 1 || completedLessons.includes(lessonNum - 1);

  // Shared hearts display used in the home, lesson, and quiz screen headers.
  const heartsDisplay =
    '❤️'.repeat(hearts) + '🤍'.repeat(STARTING_HEARTS - hearts);

  const handleStartLearning = (lessonNum: number) => {
    if (!isLessonUnlocked(lessonNum)) {
      return;
    }
    setSelectedLesson(lessonNum);
    setScreen('lesson');
  };

  const handleStartQuiz = () => {
    if (hearts <= 0) {
      // Zero hearts should never start a quiz; the lesson screen offers a
      // refill action instead of a start button in this state.
      return;
    }
    const questions = generateQuizQuestions(selectedLesson);
    setCurrentQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions([]);
    setShowFeedback(false);
    setQuizCompleted(false);
    setScreen('quiz');
  };

  const handleAnswer = (selectedAnswer: number) => {
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setXp(xp + 20);
      setDailyXp(dailyXp + 20);
    } else {
      setHearts(current => Math.max(0, current - 1));
    }

    setAnsweredQuestions([...answeredQuestions, selectedAnswer]);
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
      return;
    }

    setQuizCompleted(true);
    setShowFeedback(false);

    const finalPercentage = Math.round(
      (score / currentQuizQuestions.length) * 100,
    );
    if (finalPercentage >= PASS_THRESHOLD) {
      setCompletedLessons(current =>
        current.includes(selectedLesson) ? current : [...current, selectedLesson],
      );
      if (!hasLoggedStreakToday) {
        setStreak(current => current + 1);
        setHasLoggedStreakToday(true);
      }
    }
  };

  const handleRetryQuiz = () => {
    if (hearts <= 0) {
      // Stay on the results screen and let the refill flow (via Back to
      // Home -> lesson screen) handle getting hearts back before retrying.
      return;
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions([]);
    setShowFeedback(false);
    setQuizCompleted(false);
  };

  const handleRefillHearts = () => {
    // Deterministic local-session reset; no server/network call involved.
    setHearts(STARTING_HEARTS);
  };

  const handleBackToHome = () => {
    setScreen('home');
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  // Home Screen
  if (screen === 'home') {
    const activeLevelInfo = JLPT_ROADMAP.find(
      entry => entry.level === selectedLevel,
    )!;
    const levelLessons = lessonData.filter(
      lesson => lesson.jlptLevel === selectedLevel,
    );
    const dailyGoalMet = dailyXp >= DAILY_GOAL_XP;
    const questProgress = Math.min(dailyXp / DAILY_GOAL_XP, 1) * 100;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#58CC02" />
        <View style={styles.header} accessibilityRole="header">
          <Text style={styles.headerText}>🎌 JPLingo</Text>
          <Text style={styles.subtitle}>N5 → N1 Japanese roadmap</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>みんなの日本語</Text>
            <Text style={styles.cardSubtitle}>Minna No Nihongo</Text>
            <Text style={styles.cardDescription}>
              Original lessons inspired by the classic beginner curriculum,
              organized along the JLPT N5-N1 roadmap.
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{streak}🔥</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statBox}>
              <Text
                style={styles.statHearts}
                accessibilityLabel={`${hearts} of ${STARTING_HEARTS} hearts remaining`}>
                {heartsDisplay}
              </Text>
              <Text style={styles.statLabel}>Hearts</Text>
            </View>
          </View>

          <View
            style={styles.questCard}
            accessibilityRole="progressbar"
            accessibilityValue={{
              min: 0,
              max: DAILY_GOAL_XP,
              now: Math.min(dailyXp, DAILY_GOAL_XP),
            }}>
            <View style={styles.questHeaderRow}>
              <Text style={styles.questTitle}>
                {dailyGoalMet ? '✅ Daily Quest Complete!' : '🎯 Daily Quest'}
              </Text>
              <Text style={styles.questSubtitle}>
                {Math.min(dailyXp, DAILY_GOAL_XP)}/{DAILY_GOAL_XP} XP
              </Text>
            </View>
            <View style={styles.questProgressTrack}>
              <View
                style={[
                  styles.questProgressFill,
                  {width: `${questProgress}%`},
                ]}
              />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🗾 JLPT Roadmap</Text>
            <Text style={styles.sectionSubtitle}>
              Select a level to see its lessons and goals
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.levelSelectorRow}>
            {JLPT_ROADMAP.map(entry => {
              const isActive = entry.level === selectedLevel;
              return (
                <TouchableOpacity
                  key={entry.level}
                  style={[
                    styles.levelTab,
                    isActive && styles.levelTabActive,
                    !entry.available && styles.levelTabPlanned,
                  ]}
                  accessibilityRole="tab"
                  accessibilityState={{selected: isActive}}
                  accessibilityLabel={`${entry.level}: ${entry.name}${
                    entry.available ? '' : ', planned, no lessons yet'
                  }`}
                  onPress={() => setSelectedLevel(entry.level)}>
                  <Text
                    style={[
                      styles.levelTabTitle,
                      isActive && styles.levelTabTitleActive,
                    ]}>
                    {entry.level}
                  </Text>
                  <Text style={styles.levelTabSubtitle}>{entry.name}</Text>
                  {!entry.available && (
                    <Text style={styles.levelTabLocked}>🔒 Planned</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.roadmapGoalCard}>
            <Text style={styles.roadmapGoalTitle}>
              {activeLevelInfo.level} · {activeLevelInfo.name}
            </Text>
            <Text style={styles.roadmapGoalText}>{activeLevelInfo.goal}</Text>
            <View style={styles.roadmapTopicsRow}>
              {activeLevelInfo.topics.map(topic => (
                <View key={topic} style={styles.roadmapTopicChip}>
                  <Text style={styles.roadmapTopicText}>{topic}</Text>
                </View>
              ))}
            </View>
          </View>

          {activeLevelInfo.available ? (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>📚 Select a Lesson</Text>
                <Text style={styles.sectionSubtitle}>
                  {levelLessons.length} lessons ·{' '}
                  {
                    levelLessons.filter(l => completedLessons.includes(l.num))
                      .length
                  }{' '}
                  completed
                </Text>
              </View>

              <View style={styles.lessonGrid}>
                {levelLessons.map(lesson => {
                  const unlocked = isLessonUnlocked(lesson.num);
                  const completed = completedLessons.includes(lesson.num);
                  return (
                    <TouchableOpacity
                      key={lesson.num}
                      style={[
                        styles.lessonButton,
                        !unlocked && styles.lessonButtonLocked,
                        completed && styles.lessonButtonCompleted,
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`Lesson ${lesson.num}: ${lesson.english}${
                        completed ? ', completed' : unlocked ? '' : ', locked'
                      }`}
                      onPress={() => handleStartLearning(lesson.num)}
                      disabled={!unlocked}>
                      <View style={styles.lessonNumberBadge}>
                        <Text style={styles.lessonNumberText}>
                          {completed ? '✓' : lesson.num}
                        </Text>
                      </View>
                      <Text style={styles.lessonTitleJapanese}>
                        {lesson.title}
                      </Text>
                      <Text style={styles.lessonTitleEnglish} numberOfLines={2}>
                        {lesson.english}
                      </Text>
                      {!unlocked && (
                        <Text style={styles.lockedIcon}>🔒</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          ) : (
            <View style={styles.plannedCard}>
              <Text style={styles.plannedTitle}>
                🔒 {activeLevelInfo.level} lessons are planned, not built yet
              </Text>
              <Text style={styles.plannedText}>
                We don't want to overclaim: there is no{' '}
                {activeLevelInfo.level} lesson content in the app today. This
                roadmap slot shows what is planned so progress stays honest.
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Backend: localhost:3000 ✓</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Lesson Screen
  if (screen === 'lesson') {
    const currentLesson = lessonData.find((l) => l.num === selectedLesson);
    const content = lessonContent[selectedLesson] || lessonContent[1];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#58CC02" />
        <View style={styles.header}>
          <Text style={styles.headerText}>📚 Lesson {selectedLesson}</Text>
          <Text style={styles.subtitle}>
            {currentLesson?.title} - {currentLesson?.english}
          </Text>
          <Text
            style={styles.headerHearts}
            accessibilityLabel={`${hearts} of ${STARTING_HEARTS} hearts remaining`}>
            {heartsDisplay}
          </Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.lessonCard}>
            <Text style={styles.sectionTitle}>Grammar Points</Text>
            {content.grammar.map((point, index) => (
              <View key={index} style={styles.grammarSection}>
                <Text style={styles.grammarText}>{point.title}</Text>
                <Text style={styles.descriptionText}>{point.description}</Text>
                <Text style={styles.exampleText}>{point.example}</Text>
              </View>
            ))}
          </View>

          <View style={styles.lessonCard}>
            <Text style={styles.sectionTitle}>Vocabulary</Text>
            {content.vocabulary.map((word, index) => (
              <View key={index} style={styles.vocabItem}>
                <Text style={styles.vocabJapanese}>{word.japanese}</Text>
                <Text style={styles.vocabRomaji}>{word.romaji}</Text>
                <Text style={styles.vocabEnglish}>{word.english}</Text>
              </View>
            ))}
          </View>

          {hearts > 0 ? (
            <TouchableOpacity
              style={styles.button}
              accessibilityRole="button"
              onPress={handleStartQuiz}>
              <Text style={styles.buttonText}>START QUIZ</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.noHeartsCard}>
              <Text style={styles.noHeartsTitle}>💔 Out of hearts</Text>
              <Text style={styles.noHeartsText}>
                You need at least one heart to start a quiz. Refill to keep
                practicing.
              </Text>
              <TouchableOpacity
                style={styles.button}
                accessibilityRole="button"
                accessibilityLabel="Refill hearts"
                onPress={handleRefillHearts}>
                <Text style={styles.buttonText}>REFILL HEARTS</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Quiz Screen
  if (screen === 'quiz') {
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const percentage = Math.round((score / currentQuizQuestions.length) * 100);
    const passed = percentage >= PASS_THRESHOLD;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#58CC02" />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {quizCompleted ? (passed ? '🎉 Quiz Complete!' : '📝 Quiz Complete') : `✏️ Quiz ${currentQuestionIndex + 1}/${currentQuizQuestions.length}`}
          </Text>
          <Text style={styles.subtitle}>Score: {score} | XP: {xp}</Text>
          <Text
            style={styles.headerHearts}
            accessibilityLabel={`${hearts} of ${STARTING_HEARTS} hearts remaining`}>
            {heartsDisplay}
          </Text>
        </View>

        <ScrollView style={styles.content}>
          {!quizCompleted ? (
            <>
              {/* Current Question */}
              <View style={styles.quizCard}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>

                {!showFeedback ? (
                  // Show answer options
                  currentQuestion.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleAnswer(index)}>
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  // Show feedback after answer
                  <>
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = answeredQuestions[answeredQuestions.length - 1] === index;
                      const isCorrect = index === currentQuestion.correctAnswer;
                      
                      return (
                        <View
                          key={index}
                          style={[
                            styles.optionButton,
                            isSelected && (lastAnswerCorrect ? styles.correctOption : styles.wrongOption),
                            isCorrect && !isSelected && styles.correctOption,
                          ]}>
                          <Text style={styles.optionText}>
                            {isSelected && (lastAnswerCorrect ? '✅ ' : '❌ ')}
                            {isCorrect && !isSelected && '✓ '}
                            {option}
                          </Text>
                        </View>
                      );
                    })}
                    
                    {/* Feedback Message */}
                    <View style={[styles.feedbackCard, lastAnswerCorrect ? styles.correctFeedback : styles.wrongFeedback]}>
                      <Text style={styles.feedbackTitle}>
                        {lastAnswerCorrect ? '✅ Correct!' : '❌ Wrong'}
                      </Text>
                      {!lastAnswerCorrect && (
                        <Text style={styles.feedbackCorrect}>
                          Correct answer: {currentQuestion.options[currentQuestion.correctAnswer]}
                        </Text>
                      )}
                      <Text style={styles.feedbackExplanation}>
                        {currentQuestion.explanation}
                      </Text>
                      {lastAnswerCorrect && (
                        <Text style={styles.feedbackXP}>+20 XP</Text>
                      )}
                    </View>

                    {/* Next Button */}
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={handleNextQuestion}>
                      <Text style={styles.buttonText}>
                        {currentQuestionIndex < currentQuizQuestions.length - 1 ? 'NEXT QUESTION →' : 'SEE RESULTS'}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100}%`,
                    },
                  ]}
                />
              </View>
            </>
          ) : (
            // Quiz Results
            <>
              <View style={styles.resultCard}>
                <Text style={styles.resultEmoji}>
                  {passed ? '🎉' : '📝'}
                </Text>
                <Text style={styles.resultTitle}>
                  {passed ? 'Great Job!' : 'Keep Practicing!'}
                </Text>
                <Text style={styles.resultScore}>
                  {score} / {currentQuizQuestions.length}
                </Text>
                <Text style={styles.resultPercentage}>
                  {percentage}% Correct
                </Text>
                
                <View style={styles.xpCard}>
                  <Text style={styles.xpText}>Total XP Earned</Text>
                  <Text style={styles.xpAmount}>+{score * 20} XP</Text>
                </View>

                {passed ? (
                  <View style={styles.passCard}>
                    <Text style={styles.passText}>
                      ✅ Quiz Passed! You scored at or above {PASS_THRESHOLD}%
                    </Text>
                    {completedLessons.includes(selectedLesson) && (
                      <Text style={styles.passSubText}>
                        Lesson {selectedLesson} marked complete
                        {hasLoggedStreakToday ? ' · 🔥 Streak updated' : ''}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View style={styles.failCard}>
                    <Text style={styles.failText}>
                      Keep studying! Try to score at or above {PASS_THRESHOLD}%
                    </Text>
                  </View>
                )}
              </View>

              {/* Action Buttons */}
              {hearts > 0 ? (
                <TouchableOpacity
                  style={styles.button}
                  accessibilityRole="button"
                  onPress={handleRetryQuiz}>
                  <Text style={styles.buttonText}>TRY AGAIN</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.noHeartsCard}>
                  <Text style={styles.noHeartsTitle}>💔 Out of hearts</Text>
                  <Text style={styles.noHeartsText}>
                    Refill your hearts before retrying this quiz.
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    accessibilityLabel="Refill hearts"
                    onPress={handleRefillHearts}>
                    <Text style={styles.buttonText}>REFILL HEARTS</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToHome}>
                <Text style={styles.backButtonText}>BACK TO HOME</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131F24',
  },
  header: {
    backgroundColor: '#58CC02',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
    opacity: 0.9,
  },
  headerHearts: {
    fontSize: 18,
    marginTop: 10,
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#58CC02',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#AFAFAF',
    textAlign: 'center',
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#AFAFAF',
    textAlign: 'center',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#1A2C34',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58CC02',
  },
  statHearts: {
    fontSize: 18,
    letterSpacing: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#AFAFAF',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#58CC02',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#58CC02',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lessonPreview: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 14,
    color: '#AFAFAF',
    marginBottom: 8,
  },
  lessonJapanese: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lessonEnglish: {
    fontSize: 16,
    color: '#58CC02',
    marginTop: 8,
  },
  // Lesson Selection Grid Styles
  sectionHeader: {
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#AFAFAF',
    marginTop: 4,
  },
  lessonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  // Daily quest styles
  questCard: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFC800',
  },
  questHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  questSubtitle: {
    fontSize: 14,
    color: '#FFC800',
    fontWeight: 'bold',
  },
  questProgressTrack: {
    height: 10,
    backgroundColor: '#2A3C44',
    borderRadius: 5,
    overflow: 'hidden',
  },
  questProgressFill: {
    height: '100%',
    backgroundColor: '#FFC800',
  },
  // JLPT level selector styles
  levelSelectorRow: {
    marginBottom: 15,
  },
  levelTab: {
    backgroundColor: '#1A2C34',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#2A3C44',
    alignItems: 'center',
    minWidth: 90,
  },
  levelTabActive: {
    borderColor: '#58CC02',
    backgroundColor: 'rgba(88, 204, 2, 0.12)',
  },
  levelTabPlanned: {
    opacity: 0.6,
  },
  levelTabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AFAFAF',
  },
  levelTabTitleActive: {
    color: '#58CC02',
  },
  levelTabSubtitle: {
    fontSize: 11,
    color: '#AFAFAF',
    marginTop: 2,
  },
  levelTabLocked: {
    fontSize: 10,
    color: '#FF9E4B',
    marginTop: 4,
  },
  roadmapGoalCard: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  roadmapGoalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#58CC02',
    marginBottom: 6,
  },
  roadmapGoalText: {
    fontSize: 14,
    color: '#AFAFAF',
    lineHeight: 20,
    marginBottom: 10,
  },
  roadmapTopicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roadmapTopicChip: {
    backgroundColor: '#0D1418',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  roadmapTopicText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  plannedCard: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#2A3C44',
  },
  plannedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9E4B',
    marginBottom: 8,
  },
  plannedText: {
    fontSize: 14,
    color: '#AFAFAF',
    lineHeight: 20,
  },
  lessonButton: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#58CC02',
    alignItems: 'center',
  },
  lessonButtonLocked: {
    borderColor: '#2A3C44',
    opacity: 0.5,
  },
  lessonButtonCompleted: {
    borderColor: '#FFC800',
    backgroundColor: 'rgba(255, 200, 0, 0.08)',
  },
  lessonNumberBadge: {
    backgroundColor: '#58CC02',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lessonTitleJapanese: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  lessonTitleEnglish: {
    fontSize: 12,
    color: '#AFAFAF',
    textAlign: 'center',
  },
  lockedIcon: {
    fontSize: 24,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A3C44',
  },
  footerText: {
    fontSize: 12,
    color: '#58CC02',
  },
  // Lesson Screen Styles
  lessonCard: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#58CC02',
    marginBottom: 15,
  },
  grammarSection: {
    marginBottom: 20,
  },
  grammarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#AFAFAF',
    marginBottom: 15,
    lineHeight: 24,
  },
  exampleText: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#0D1418',
    padding: 15,
    borderRadius: 8,
    lineHeight: 24,
  },
  vocabItem: {
    backgroundColor: '#0D1418',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  vocabJapanese: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  vocabRomaji: {
    fontSize: 14,
    color: '#AFAFAF',
    marginTop: 4,
  },
  vocabEnglish: {
    fontSize: 16,
    color: '#58CC02',
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#2A3C44',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#AFAFAF',
  },
  // Quiz Screen Styles
  quizCard: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#2A3C44',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#3A4C54',
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2A3C44',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58CC02',
  },
  // Quiz Feedback Styles
  correctOption: {
    borderColor: '#58CC02',
    borderWidth: 3,
    backgroundColor: 'rgba(88, 204, 2, 0.1)',
  },
  wrongOption: {
    borderColor: '#FF4B4B',
    borderWidth: 3,
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
  },
  feedbackCard: {
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
  },
  correctFeedback: {
    backgroundColor: 'rgba(88, 204, 2, 0.1)',
    borderWidth: 2,
    borderColor: '#58CC02',
  },
  wrongFeedback: {
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
    borderWidth: 2,
    borderColor: '#FF4B4B',
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  feedbackCorrect: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  feedbackExplanation: {
    fontSize: 16,
    color: '#AFAFAF',
    lineHeight: 24,
  },
  feedbackXP: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58CC02',
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: '#58CC02',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  // Result Screen Styles
  resultCard: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#58CC02',
  },
  resultPercentage: {
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: 10,
  },
  resultText: {
    fontSize: 18,
    color: '#AFAFAF',
    marginTop: 15,
    textAlign: 'center',
  },
  xpCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0D1418',
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  xpText: {
    fontSize: 14,
    color: '#AFAFAF',
  },
  xpAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58CC02',
    marginTop: 5,
  },
  passCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(88, 204, 2, 0.1)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#58CC02',
  },
  passText: {
    fontSize: 16,
    color: '#58CC02',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  passSubText: {
    fontSize: 13,
    color: '#58CC02',
    textAlign: 'center',
    marginTop: 6,
  },
  failCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF4B4B',
  },
  failText: {
    fontSize: 16,
    color: '#FF4B4B',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  xpEarned: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0D1418',
    borderRadius: 12,
    alignItems: 'center',
  },
  xpEarnedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#58CC02',
  },
  totalXpText: {
    fontSize: 16,
    color: '#AFAFAF',
    marginTop: 5,
  },
  noHeartsCard: {
    backgroundColor: '#1A2C34',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF4B4B',
  },
  noHeartsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4B4B',
    marginBottom: 8,
  },
  noHeartsText: {
    fontSize: 14,
    color: '#AFAFAF',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default App;
