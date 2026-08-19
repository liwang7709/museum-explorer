// 精选文物清单：覆盖 V1 各馆的知名/代表性文物。
// 每条: { museum, qid?, name }
//   qid  有则直接使用（更可靠）
//   无 qid 时用 name 在 Wikidata 搜索，并以收藏馆/描述匹配自动解析
// name 尽量用英文或原文名（Wikidata 搜索用），也可给 zh 便于人工辨认

export const CURATED = [
  // ── 故宫博物院 ──────────────────────────────
  { museum: 'palace-beijing', qid: 'Q676309', name: 'Along the River During the Qingming Festival', zh: '清明上河图' },
  { museum: 'palace-beijing', name: 'A Thousand Li of Rivers and Mountains', zh: '千里江山图' },
  { museum: 'palace-beijing', name: 'Five Oxen (Han Huang)', zh: '五牛图' },
  { museum: 'palace-beijing', name: 'Emperor Taizong Receiving the Tibetan Envoy', zh: '步辇图' },
  { museum: 'palace-beijing', name: 'Nymph of the Luo River (Gu Kaizhi)', zh: '洛神赋图' },
  { museum: 'palace-beijing', name: 'Jade Mountain Yu the Great Taming the Flood', zh: '大禹治水图玉山' },
  { museum: 'palace-beijing', name: 'Stone Drums of Qin', zh: '石鼓' },
  { museum: 'palace-beijing', name: 'Ding ware child pillow', zh: '定窑白瓷孩儿枕' },
  { museum: 'palace-beijing', name: 'Golden chalice of eternal stability', zh: '金瓯永固杯' },
  { museum: 'palace-beijing', name: 'Ru ware narcissus basin', zh: '汝窑青瓷水仙盆' },
  { museum: 'palace-beijing', name: 'Colored glaze vase with twelve zodiac signs', zh: '十二生肖珐琅彩' },

  // ── 中国国家博物馆 ──────────────────────────
  { museum: 'nmc', name: 'Houmuwu ding (Simuwu ding)', zh: '后母戊鼎' },
  { museum: 'nmc', name: 'Four-goat square zun', zh: '四羊方尊' },
  { museum: 'nmc', name: 'Eastern Han pottery storytelling figure', zh: '击鼓说唱俑' },
  { museum: 'nmc', name: 'Empress Xiaoduan phoenix crown', zh: '孝端皇后凤冠' },
  { museum: 'nmc', name: 'Human face fish pattern basin', zh: '人面鱼纹彩陶盆' },
  { museum: 'nmc', name: 'Da Yu ding', zh: '大盂鼎' },
  { museum: 'nmc', name: 'Guo Jizi white plate', zh: '虢季子白盘' },
  { museum: 'nmc', name: 'Crane and fish painted pottery jar', zh: '鹳鱼石斧图彩陶缸' },

  // ── 上海博物馆 ──────────────────────────────
  { museum: 'shanghai-museum', name: 'Da Ke ding', zh: '大克鼎' },
  { museum: 'shanghai-museum', name: 'Jinhou Su bells', zh: '晋侯稣钟' },
  { museum: 'shanghai-museum', name: 'Shang Yang square measure', zh: '商鞅方升' },
  { museum: 'shanghai-museum', name: 'Zi Zhong Jiang pan', zh: '子仲姜盘' },

  // ── 台北故宫 ────────────────────────────────
  { museum: 'npm-taipei', qid: 'Q7090288', name: 'Jadeite Cabbage', zh: '翠玉白菜' },
  { museum: 'npm-taipei', name: 'Meat-Shaped Stone', zh: '肉形石' },
  { museum: 'npm-taipei', name: 'Mao Gong ding', zh: '毛公鼎' },
  { museum: 'npm-taipei', name: 'Dwelling in the Fuchun Mountains', zh: '富春山居图（无用师卷）' },
  { museum: 'npm-taipei', name: 'Ru ware narcissus basin (Taipei)', zh: '汝窑青瓷无纹水仙盆' },
  { museum: 'npm-taipei', name: 'Sacrificial Manuscript of Nephew Ji', zh: '祭侄文稿' },
  { museum: 'npm-taipei', name: 'Fast Snow on a Clear Day', zh: '快雪时晴帖' },

  // ── 秦始皇兵马俑 ────────────────────────────
  { museum: 'terra-cotta', qid: 'Q48541', name: 'Terracotta Army', zh: '秦始皇兵马俑' },
  { museum: 'terra-cotta', name: 'Bronze chariot and horses of Qin', zh: '秦陵铜车马' },
  { museum: 'terra-cotta', name: 'Kneeling archer figurine', zh: '跪射俑' },

  // ── 湖北省博物馆 ────────────────────────────
  { museum: 'hubei-museum', name: 'Bianzhong of Marquis Yi of Zeng', zh: '曾侯乙编钟' },
  { museum: 'hubei-museum', name: 'Sword of Goujian', zh: '越王勾践剑' },

  // ── 湖南博物院 ──────────────────────────────
  { museum: 'hunan-museum', name: 'Plain silk gown of Mawangdui', zh: '素纱襌衣' },
  { museum: 'hunan-museum', name: 'T-shaped silk painting of Mawangdui', zh: '马王堆T形帛画' },
  { museum: 'hunan-museum', qid: 'Q459219', name: 'Lady Dai (Xin Zhui)', zh: '辛追夫人' },

  // ── 三星堆 ──────────────────────────────────
  { museum: 'sanxingdui', name: 'Grand bronze standing figure', zh: '青铜大立人像' },
  { museum: 'sanxingdui', name: 'Bronze mask with protruding eyes', zh: '青铜纵目面具' },
  { museum: 'sanxingdui', name: 'Bronze sacred tree', zh: '青铜神树' },
  { museum: 'sanxingdui', name: 'Gold mask of Sanxingdui', zh: '黄金面具' },

  // ── 大都会 MET（官方API）────────────────────
  { museum: 'met', qid: 'Q45522', name: 'The Great Wave off Kanagawa', zh: '神奈川冲浪里' },
  { museum: 'met', qid: 'Q1416240', name: 'Washington Crossing the Delaware', zh: '华盛顿横渡特拉华河' },
  { museum: 'met', name: 'Aristotle with a Bust of Homer', zh: '亚里士多德与荷马半身像' },
  { museum: 'met', name: 'The Death of Socrates', zh: '苏格拉底之死' },
  { museum: 'met', name: 'The Harvesters (Bruegel)', zh: '收割者（勃鲁盖尔）' },
  { museum: 'met', name: 'Young Woman with a Water Pitcher', zh: '持水壶的年轻女子' },
  { museum: 'met', name: 'The Gulf Stream', zh: '湾流（霍默）' },
  { museum: 'met', name: 'Madame X (Sargent)', zh: 'X夫人（萨金特）' },
  { museum: 'met', name: 'The Temple of Dendur', zh: '丹铎神庙' },
  { museum: 'met', name: 'Merode Altarpiece', zh: '梅罗德三联画' },
  { museum: 'met', name: 'Autumn Rhythm (Pollock)', zh: '秋韵（波洛克）' },
  { museum: 'met', name: 'Self-Portrait with a Straw Hat (Van Gogh)', zh: '戴草帽的自画像（梵高）' },

  // ── MoMA ────────────────────────────────────
  { museum: 'moma', qid: 'Q45585', name: 'The Starry Night', zh: '星月夜' },
  { museum: 'moma', qid: 'Q205153', name: 'The Persistence of Memory', zh: '记忆的永恒' },
  { museum: 'moma', qid: 'Q200874', name: 'Les Demoiselles d\u2019Avignon', zh: '亚维农少女' },
  { museum: 'moma', name: "Campbell's Soup Cans", zh: '金宝汤罐头' },
  { museum: 'moma', name: 'The Sleeping Gypsy', zh: '沉睡的吉普赛人' },
  { museum: 'moma', name: 'The Dance (Matisse)', zh: '舞蹈（马蒂斯）' },
  { museum: 'moma', name: 'Broadway Boogie-Woogie', zh: '百老汇爵士乐' },
  { museum: 'moma', name: 'Water Lilies (Monet, MoMA)', zh: '睡莲（莫奈）' },

  // ── 芝加哥艺术学院（官方API）────────────────
  { museum: 'aic', qid: 'Q146353', name: 'American Gothic', zh: '美国哥特式' },
  { museum: 'aic', qid: 'Q735210', name: 'Nighthawks', zh: '夜游者' },
  { museum: 'aic', qid: 'Q467416', name: 'A Sunday on La Grande Jatte', zh: '大碗岛的星期天下午' },
  { museum: 'aic', qid: 'Q1149501', name: 'The Old Guitarist', zh: '老吉他手' },
  { museum: 'aic', name: 'The Bedroom (Van Gogh, Chicago)', zh: '梵高的卧室（芝加哥版）' },
  { museum: 'aic', name: 'Water Lilies (Monet, Chicago)', zh: '睡莲（莫奈·芝加哥）' },

  // ── 史密森尼 ────────────────────────────────
  { museum: 'smithsonian', name: 'Spirit of St. Louis', zh: '圣路易斯精神号' },
  { museum: 'smithsonian', name: 'Apollo 11 command module Columbia', zh: '阿波罗11号指令舱哥伦比亚号' },
  { museum: 'smithsonian', name: 'Wright Flyer', zh: '莱特飞行器' },
  { museum: 'smithsonian', name: 'Hope Diamond', zh: '希望钻石' },
  { museum: 'smithsonian', name: 'Ruby slippers (Wizard of Oz)', zh: '红宝石鞋' },
  { museum: 'smithsonian', name: 'Star-Spangled Banner flag', zh: '星条旗（1814）' },
  { museum: 'smithsonian', name: 'Peacock Room', zh: '孔雀厅' },
  { museum: 'smithsonian', name: 'Lansdowne Portrait of George Washington', zh: '兰斯敦华盛顿肖像' },

  // ── 美国国家美术馆 ──────────────────────────
  { museum: 'nga', qid: 'Q592453', name: 'Ginevra de\u2019 Benci', zh: '吉内薇拉·德·班琪' },
  { museum: 'nga', name: 'The Alba Madonna', zh: '阿尔巴圣母' },
  { museum: 'nga', name: 'A Woman with a Lute (Vermeer)', zh: '持鲁特琴的女子（维米尔）' },

  // ── 盖蒂 ────────────────────────────────────
  { museum: 'getty', name: 'Irises (Van Gogh)', zh: '鸢尾花（梵高）' },
  { museum: 'getty', name: 'The Entombment (Pontormo)', zh: '埋葬（蓬托尔莫）' },

  // ── 克利夫兰（官方API）──────────────────────
  { museum: 'cleveland', name: 'La Vie (Picasso)', zh: '生命（毕加索）' },
  { museum: 'cleveland', name: 'The Thinker (Rodin, Cleveland)', zh: '思想者（克利夫兰藏）' },
  { museum: 'cleveland', name: 'Saint George and the Dragon (Cleveland)', zh: '圣乔治屠龙（克利夫兰）' },

  // ── 大英博物馆 ──────────────────────────────
  { museum: 'british-museum', qid: 'Q485500', name: 'Rosetta Stone', zh: '罗塞塔石碑' },
  { museum: 'british-museum', qid: 'Q304981', name: 'Parthenon Marbles', zh: '帕特农神庙雕塑（埃尔金大理石雕）' },
  { museum: 'british-museum', name: 'Lewis Chessmen', zh: '刘易斯棋子' },
  { museum: 'british-museum', name: "Hoa Hakananai'a", zh: '复活节岛雕像' },
  { museum: 'british-museum', name: 'Sutton Hoo helmet', zh: '萨顿胡头盔' },
  { museum: 'british-museum', name: 'The Younger Memnon', zh: '年轻的门农头像' },
  { museum: 'british-museum', qid: 'Q1542317', name: 'Cyrus Cylinder', zh: '居鲁士圆柱' },
  { museum: 'british-museum', name: 'Benin Bronzes', zh: '贝宁青铜器' },
  { museum: 'british-museum', name: 'Lion Hunt of Ashurbanipal', zh: '亚述巴尼拔猎狮浮雕' },
  { museum: 'british-museum', name: 'Hunefer Book of the Dead', zh: '胡内弗亡灵书' },

  // ── 英国国家美术馆 ──────────────────────────
  { museum: 'national-gallery-london', name: 'Arnolfini Portrait', zh: '阿尔诺菲尼夫妇' },
  { museum: 'national-gallery-london', qid: 'Q764850', name: 'The Fighting Temeraire', zh: '被拖去解体的战舰无畏号' },
  { museum: 'national-gallery-london', qid: 'Q1246054', name: 'The Hay Wain', zh: '干草车' },
  { museum: 'national-gallery-london', name: 'Sunflowers (Van Gogh, London)', zh: '向日葵（伦敦版）' },
  { museum: 'national-gallery-london', name: 'The Ambassadors (Holbein)', zh: '大使们（荷尔拜因）' },
  { museum: 'national-gallery-london', name: 'Venus and Mars (Botticelli)', zh: '维纳斯与战神' },
  { museum: 'national-gallery-london', name: 'The Virgin of the Rocks (London)', zh: '岩间圣母（伦敦版）' },

  // ── 泰特 ────────────────────────────────────
  { museum: 'tate', qid: 'Q2107300', name: 'Ophelia (Millais)', zh: '奥菲莉亚（米莱）' },
  { museum: 'tate', qid: 'Q1197736', name: 'The Lady of Shalott', zh: '夏洛特小姐' },
  { museum: 'tate', name: 'Rain, Steam and Speed', zh: '雨、蒸汽和速度' },
  { museum: 'tate', name: 'The Snail (Matisse)', zh: '蜗牛（马蒂斯）' },
  { museum: 'tate', name: 'No. 61 (Rothko)', zh: '第61号（罗斯科）' },

  // ── V&A ─────────────────────────────────────
  { museum: 'vam', name: 'Ardabil Carpet', zh: '阿尔达比勒地毯' },
  { museum: 'vam', name: "Tipu's Tiger", zh: '蒂普之虎' },
  { museum: 'vam', name: 'Great Bed of Ware', zh: '韦尔大床' },

  // ── 卢浮宫 ──────────────────────────────────
  { museum: 'louvre', qid: 'Q12418', name: 'Mona Lisa', zh: '蒙娜丽莎' },
  { museum: 'louvre', qid: 'Q188851', name: 'Venus de Milo', zh: '米洛的维纳斯' },
  { museum: 'louvre', qid: 'Q212174', name: 'Winged Victory of Samothrace', zh: '萨莫色雷斯的胜利女神' },
  { museum: 'louvre', name: 'The Raft of the Medusa', zh: '梅杜萨之筏' },
  { museum: 'louvre', name: 'Liberty Leading the People', zh: '自由引导人民' },
  { museum: 'louvre', name: 'The Coronation of Napoleon', zh: '拿破仑加冕礼' },
  { museum: 'louvre', name: 'Grande Odalisque', zh: '大宫女' },
  { museum: 'louvre', name: 'Psyche Revived by Cupid\u2019s Kiss', zh: '丘比特与普赛克' },
  { museum: 'louvre', name: 'Code of Hammurabi', zh: '汉谟拉比法典' },
  { museum: 'louvre', name: 'The Lacemaker (Vermeer)', zh: '织花边的女子（维米尔）' },
  { museum: 'louvre', name: 'Lamassu (Louvre)', zh: '人首翼牛（拉玛苏）' },
  { museum: 'louvre', name: 'The Wedding Feast at Cana', zh: '迦拿的婚礼' },

  // ── 罗丹美术馆 ──────────────────────────────
  { museum: 'musee-rodin', qid: 'Q163084', name: 'The Thinker', zh: '思想者' },
  { museum: 'musee-rodin', name: 'The Kiss (Rodin)', zh: '吻（罗丹）' },
  { museum: 'musee-rodin', name: 'The Burghers of Calais', zh: '加莱义民' },
  { museum: 'musee-rodin', name: 'The Gates of Hell', zh: '地狱之门' },

  // ── 荷兰国立 ────────────────────────────────
  { museum: 'rijksmuseum', qid: 'Q219831', name: 'The Night Watch', zh: '夜巡' },
  { museum: 'rijksmuseum', qid: 'Q374432', name: 'The Milkmaid', zh: '倒牛奶的女仆' },
  { museum: 'rijksmuseum', name: 'The Jewish Bride', zh: '犹太新娘' },
  { museum: 'rijksmuseum', name: 'The Threatened Swan', zh: '受惊的天鹅' },
  { museum: 'rijksmuseum', name: 'Self-Portrait (Rembrandt, Rijksmuseum)', zh: '自画像（伦勃朗）' },

  // ── 梵高博物馆 ──────────────────────────────
  { museum: 'van-gogh', name: 'Sunflowers (Van Gogh Museum)', zh: '向日葵（梵高博物馆版）' },
  { museum: 'van-gogh', name: 'The Potato Eaters', zh: '吃马铃薯的人' },
  { museum: 'van-gogh', name: 'Almond Blossom', zh: '杏花' },
  { museum: 'van-gogh', name: 'Self-Portrait with Bandaged Ear', zh: '割耳后的自画像' },
  { museum: 'van-gogh', name: 'The Bedroom (Van Gogh Museum)', zh: '梵高的卧室（阿姆斯特丹版）' },
  { museum: 'van-gogh', name: 'Wheatfield with Crows', zh: '麦田里的乌鸦' },

  // ── 莫瑞泰斯 ────────────────────────────────
  { museum: 'mauritshuis', qid: 'Q164021', name: 'Girl with a Pearl Earring', zh: '戴珍珠耳环的少女' },
  { museum: 'mauritshuis', name: 'The Anatomy Lesson of Dr. Nicolaes Tulp', zh: '杜普教授的解剖课' },
  { museum: 'mauritshuis', name: 'View of Delft', zh: '代尔夫特风景' },
  { museum: 'mauritshuis', name: 'The Goldfinch (Fabritius)', zh: '金翅雀（法布里蒂乌斯）' },

  // ── 乌菲兹 ──────────────────────────────────
  { museum: 'uffizi', qid: 'Q467068', name: 'The Birth of Venus', zh: '维纳斯的诞生' },
  { museum: 'uffizi', qid: 'Q186961', name: 'Primavera', zh: '春' },
  { museum: 'uffizi', qid: 'Q313035', name: 'Venus of Urbino', zh: '乌尔比诺的维纳斯' },
  { museum: 'uffizi', name: 'Annunciation (Leonardo, Uffizi)', zh: '天使报喜（达·芬奇）' },
  { museum: 'uffizi', name: 'Medusa (Caravaggio)', zh: '美杜莎（卡拉瓦乔）' },
  { museum: 'uffizi', name: 'Doni Tondo', zh: '多尼圆形画' },

  // ── 普拉多 ──────────────────────────────────
  { museum: 'prado', qid: 'Q188717', name: 'Las Meninas', zh: '宫娥' },
  { museum: 'prado', qid: 'Q233166', name: 'The Garden of Earthly Delights', zh: '人间乐园' },
  { museum: 'prado', name: 'The Third of May 1808', zh: '1808年5月3日' },
  { museum: 'prado', name: 'Saturn Devouring His Son', zh: '农神吞噬其子' },
  { museum: 'prado', name: 'Las Hilanderas', zh: '纺织女' },

  // ── 索菲亚王后艺术中心 ──────────────────────
  { museum: 'reina-sofia', qid: 'Q172790', name: 'Guernica', zh: '格尔尼卡' },

  // ── 维也纳艺术史博物馆 ──────────────────────
  { museum: 'khm', name: 'Cellini Salt Cellar', zh: '切利尼盐罐' },
  { museum: 'khm', name: 'The Hunters in the Snow', zh: '雪中猎人' },
  { museum: 'khm', name: 'The Tower of Babel', zh: '巴别塔' },
  { museum: 'khm', name: 'Portrait of Infanta Margarita (Velázquez)', zh: '玛格丽特公主像' },

  // ── 艾尔米塔什 ──────────────────────────────
  { museum: 'hermitage', name: 'Peacock Clock', zh: '孔雀钟' },
  { museum: 'hermitage', name: 'Madonna Litta', zh: '利塔圣母' },
  { museum: 'hermitage', name: 'Dana\u00eb (Rembrandt)', zh: '达娜厄（伦勃朗）' },
  { museum: 'hermitage', name: 'The Return of the Prodigal Son (Rembrandt)', zh: '浪子回头（伦勃朗）' },
  { museum: 'hermitage', name: 'Crouching Boy (Michelangelo)', zh: '蹲着的男孩（米开朗基罗）' },

  // ── 梵蒂冈博物馆 ────────────────────────────
  { museum: 'vatican', qid: 'Q207108', name: 'Laoco\u00f6n and His Sons', zh: '拉奥孔群像' },
  { museum: 'vatican', name: 'The Creation of Adam', zh: '创造亚当' },
  { museum: 'vatican', name: 'The Last Judgment (Michelangelo)', zh: '最后的审判（米开朗基罗）' },
  { museum: 'vatican', name: 'The School of Athens', zh: '雅典学院' },
  { museum: 'vatican', name: 'Apollo Belvedere', zh: '观景殿的阿波罗' },

  // ── 东京国立博物馆 ──────────────────────────
  { museum: 'tokyo-national', name: 'Yohen Tenmoku tea bowl', zh: '曜变天目茶碗' },
  { museum: 'tokyo-national', name: 'Pine Trees screen (Hasegawa T\u014dhaku)', zh: '松林图屏风（长谷川等伯）' },
  { museum: 'tokyo-national', name: 'Red and White Plum Blossoms (K\u014drin)', zh: '红白梅图屏风（尾形光琳）' },
  { museum: 'tokyo-national', name: 'Haniwa warrior in keik\u014d armor', zh: '埴轮·挂甲武人' },
  { museum: 'tokyo-national', name: 'Wind and Thunder Gods screen (S\u014dtatsu)', zh: '风神雷神图屏风（俵屋宗达）' },

  // ── 韩国国立中央博物馆 ──────────────────────
  { museum: 'korea-national', name: 'Gilt-bronze Maitreya in Meditation', zh: '金铜半跏思惟像' },
  { museum: 'korea-national', name: 'Silla gold crown', zh: '新罗金冠' },
  { museum: 'korea-national', name: 'Celadon incense burner with openwork lid', zh: '青瓷镂空香炉' },

  // ── 挪威国家博物馆 ──────────────────────────
  { museum: 'norway-national', qid: 'Q47165', name: 'The Scream', zh: '呐喊' },
  { museum: 'norway-national', name: 'The Sick Child (Munch)', zh: '病中的孩子（蒙克）' },
];
