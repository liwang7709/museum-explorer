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

  // ══════════════ V1.1 扩充（每筛选区≥20件） ══════════════

  // ── 台北故宫（+16）────────────────────────
  { museum: 'npm-taipei', name: 'Travelers Among Mountains and Streams', zh: '谿山行旅图' },
  { museum: 'npm-taipei', name: 'Early Spring (Guo Xi)', zh: '早春图' },
  { museum: 'npm-taipei', name: 'Wind in Pines among a Myriad Valleys', zh: '万壑松风图' },
  { museum: 'npm-taipei', name: 'Cold Food Observance', zh: '寒食帖' },
  { museum: 'npm-taipei', name: 'Autobiography (Huai Su)', zh: '自叙帖' },
  { museum: 'npm-taipei', name: 'Poems for the Pine Wind Pavilion', zh: '松风阁诗帖' },
  { museum: 'npm-taipei', name: 'Poems Written on Silk (Mi Fu)', zh: '蜀素帖' },
  { museum: 'npm-taipei', name: 'Ru ware warm bowl with lotus petals', zh: '汝窑青瓷莲花式温碗' },
  { museum: 'npm-taipei', name: 'San Shi Pan', zh: '散氏盘' },
  { museum: 'npm-taipei', name: 'One Hundred Horses (Lang Shining)', zh: '百骏图' },
  { museum: 'npm-taipei', name: 'Ru ware narcissus basin (Taipei)', zh: '汝窑青瓷无纹水仙盆' },
  { museum: 'npm-taipei', name: 'Sacrificial Manuscript of Nephew Ji', zh: '祭侄文稿' },
  { museum: 'npm-taipei', name: 'Fast Snow on a Clear Day', zh: '快雪时晴帖' },
  { museum: 'npm-taipei', name: 'Jadeite Cabbage with insects', zh: '翠玉白菜' },
  { museum: 'npm-taipei', name: 'Meat-Shaped Stone', zh: '肉形石' },

  // ── 英国（+8）──────────────────────────────
  { museum: 'british-museum', name: 'Standard of Ur', zh: '乌尔的军旗' },
  { museum: 'british-museum', name: 'Flood Tablet', zh: '大洪水泥板' },
  { museum: 'british-museum', name: 'Lindow Man', zh: '林道人' },
  { museum: 'national-gallery-london', name: 'Bacchus and Ariadne', zh: '酒神与阿里阿德涅' },
  { museum: 'national-gallery-london', name: 'The Water-Lily Pond (Monet)', zh: '睡莲池（莫奈）' },
  { museum: 'tate', name: 'Rain, Steam and Speed', zh: '雨、蒸汽和速度' },
  { museum: 'tate', name: 'The Snail (Matisse)', zh: '蜗牛（马蒂斯）' },
  { museum: 'vam', name: 'Great Bed of Ware', zh: '韦尔大床' },

  // ── 法国（+8）──────────────────────────────
  { museum: 'louvre', name: 'The Wedding Feast at Cana', zh: '迦拿的婚礼' },
  { museum: 'louvre', name: 'The Valpin\u00e7on Bather', zh: '瓦平松的浴女' },
  { museum: 'louvre', name: 'The Cheat with the Ace of Diamonds', zh: '方片A的作弊者' },
  { museum: 'louvre', name: 'Great Sphinx of Tanis', zh: '塔尼斯狮身人面像' },
  { museum: 'louvre', name: 'The Lacemaker (Vermeer)', zh: '织花边的女子（维米尔）' },
  { museum: 'louvre', name: 'Lamassu (Louvre)', zh: '人首翼牛（拉玛苏）' },
  { museum: 'musee-rodin', name: 'Eve (Rodin)', zh: '夏娃（罗丹）' },
  { museum: 'musee-rodin', name: 'Monument to Balzac', zh: '巴尔扎克纪念像' },

  // ── 荷兰（+15）─────────────────────────────
  { museum: 'rijksmuseum', name: 'Woman in Blue Reading a Letter', zh: '读信的蓝衣女子' },
  { museum: 'rijksmuseum', name: 'The Love Letter (Vermeer)', zh: '情书（维米尔）' },
  { museum: 'rijksmuseum', name: 'Self-Portrait (Rembrandt, Rijksmuseum)', zh: '自画像（伦勃朗·阿姆斯特丹版）' },
  { museum: 'rijksmuseum', name: 'The Merry Drinker', zh: '快乐的酒徒' },
  { museum: 'van-gogh', name: 'Sunflowers (Van Gogh Museum)', zh: '向日葵（梵高博物馆版）' },
  { museum: 'van-gogh', name: 'The Bedroom (Van Gogh Museum)', zh: '梵高的卧室（阿姆斯特丹版）' },
  { museum: 'van-gogh', name: 'Wheatfield with Crows', zh: '麦田里的乌鸦' },
  { museum: 'van-gogh', name: 'The Sower (Van Gogh)', zh: '播种者（梵高）' },
  { museum: 'van-gogh', name: 'Self-Portrait as a Painter', zh: '画家自画像（梵高）' },
  { museum: 'mauritshuis', name: 'The Goldfinch (Fabritius)', zh: '金翅雀（法布里蒂乌斯）' },
  { museum: 'mauritshuis', name: 'View of Delft', zh: '代尔夫特风景' },
  { museum: 'mauritshuis', name: 'Self-Portrait (Rembrandt, Mauritshuis)', zh: '自画像（伦勃朗·海牙版）' },
  { museum: 'rijksmuseum', name: 'The Windmill at Wijk bij Duurstede', zh: '韦克风车' },
  { museum: 'rijksmuseum', name: 'Still Life with Flowers in a Glass Vase', zh: '玻璃瓶花卉静物' },
  { museum: 'rijksmuseum', name: 'The Threatened Swan', zh: '受惊的天鹅' },

  // ── 意大利·乌菲兹（+20）────────────────────
  { museum: 'uffizi', name: 'Annunciation (Leonardo, Uffizi)', zh: '天使报喜（达·芬奇）' },
  { museum: 'uffizi', name: 'Adoration of the Magi (Leonardo)', zh: '三博士来朝（达·芬奇）' },
  { museum: 'uffizi', name: 'Bacchus (Caravaggio)', zh: '酒神（卡拉瓦乔）' },
  { museum: 'uffizi', name: 'Medusa (Caravaggio)', zh: '美杜莎（卡拉瓦乔）' },
  { museum: 'uffizi', name: 'Flora (Titian)', zh: '花神（提香）' },
  { museum: 'uffizi', name: 'Calumny of Apelles', zh: '诽谤（波提切利）' },
  { museum: 'uffizi', name: 'Pallas and the Centaur', zh: '雅典娜与半人马' },
  { museum: 'uffizi', name: 'Madonna of the Goldfinch', zh: '金翅雀圣母' },
  { museum: 'uffizi', name: 'Portrait of Leo X', zh: '教皇利奥十世' },
  { museum: 'uffizi', name: 'Battle of San Romano', zh: '圣罗马诺之战' },
  { museum: 'uffizi', name: 'Annunciation (Simone Martini)', zh: '天使报喜（西蒙内·马蒂尼）' },
  { museum: 'uffizi', name: 'Doni Tondo', zh: '多尼圆形画' },
  { museum: 'uffizi', name: 'Venus of Urbino', zh: '乌尔比诺的维纳斯' },
  { museum: 'uffizi', name: 'The Birth of Venus', zh: '维纳斯的诞生' },
  { museum: 'uffizi', name: 'Primavera', zh: '春' },
  { museum: 'uffizi', name: 'Bacchus (Caravaggio, Uffizi)', zh: '酒神巴库斯' },
  { museum: 'uffizi', name: 'Saint Anne (Masaccio)', zh: '圣安娜（马萨乔）' },
  { museum: 'uffizi', name: 'The Holy Family (Andrea del Sarto)', zh: '圣家族（安德烈亚·德尔·萨尔托）' },
  { museum: 'uffizi', name: 'Portrait of Bia de\u2019 Medici', zh: '比亚·德·美第奇' },
  { museum: 'uffizi', name: 'Annunciation (Botticelli)', zh: '天使报喜（波提切利）' },

  // ── 西班牙（+18）───────────────────────────
  { museum: 'prado', name: 'The Triumph of Bacchus', zh: '酒神的胜利' },
  { museum: 'prado', name: 'The Nobleman with his Hand on his Chest', zh: '手抚胸膛的骑士' },
  { museum: 'prado', name: 'View of Toledo', zh: '托莱多风景' },
  { museum: 'prado', name: 'La maja desnuda', zh: '裸体的玛哈' },
  { museum: 'prado', name: 'La maja vestida', zh: '着衣的玛哈' },
  { museum: 'prado', name: 'The Parasol (Goya)', zh: '阳伞（戈雅）' },
  { museum: 'prado', name: 'Charles IV of Spain and His Family', zh: '查理四世一家' },
  { museum: 'prado', name: 'The Immaculate Conception (Murillo)', zh: '无玷受胎（牟利罗）' },
  { museum: 'prado', name: 'The Three Graces (Rubens)', zh: '美惠三女神（鲁本斯）' },
  { museum: 'prado', name: 'The Garden of Love (Rubens)', zh: '爱之园（鲁本斯）' },
  { museum: 'prado', name: 'The Card Players (Caravaggio)', zh: '打牌的人（卡拉瓦乔）' },
  { museum: 'prado', name: 'The Drowning Dog', zh: '溺水之犬' },
  { museum: 'prado', name: 'Saturn Devouring His Son', zh: '农神吞噬其子' },
  { museum: 'prado', name: 'The Third of May 1808', zh: '1808年5月3日' },
  { museum: 'prado', name: 'Las Hilanderas', zh: '纺织女' },
  { museum: 'reina-sofia', name: 'The Great Masturbator', zh: '伟大的自慰者' },
  { museum: 'reina-sofia', name: 'Woman in Blue (Picasso)', zh: '蓝衣女子（毕加索）' },
  { museum: 'reina-sofia', name: 'The Poet (Picasso)', zh: '诗人（毕加索）' },

  // ── 奥地利·艺术史博物馆（+18）──────────────
  { museum: 'khm', name: 'The Peasant Wedding', zh: '农民婚礼' },
  { museum: 'khm', name: 'The Peasant Dance', zh: '农民舞蹈' },
  { museum: 'khm', name: "Children's Games", zh: '儿童游戏' },
  { museum: 'khm', name: 'The Census at Bethlehem', zh: '伯利恒的户口调查' },
  { museum: 'khm', name: 'The Massacre of the Innocents', zh: '屠杀无辜者' },
  { museum: 'khm', name: 'The Land of Cockaigne', zh: '安乐乡' },
  { museum: 'khm', name: 'The Fight Between Carnival and Lent', zh: '谢肉祭与四旬斋之争' },
  { museum: 'khm', name: 'Madonna of the Meadow (Raphael)', zh: '草地上的圣母（拉斐尔）' },
  { museum: 'khm', name: 'Madonna of the Rosary', zh: '玫瑰经圣母' },
  { museum: 'khm', name: 'Portrait of Infanta Margarita (Vel\u00e1zquez)', zh: '玛格丽特公主像' },
  { museum: 'khm', name: 'The Tower of Babel', zh: '巴别塔' },
  { museum: 'khm', name: 'The Hunters in the Snow', zh: '雪中猎人' },
  { museum: 'khm', name: 'Cellini Salt Cellar', zh: '切利尼盐罐' },
  { museum: 'khm', name: 'The Dulle Griet', zh: '疯女玛格丽特' },
  { museum: 'khm', name: 'The Alchemist (Teniers)', zh: '炼金术士' },
  { museum: 'khm', name: 'Amor Victorious (Caravaggio)', zh: '胜利的爱神（卡拉瓦乔）' },
  { museum: 'khm', name: 'The Annunciation (Barocci)', zh: '天使报喜（巴罗奇）' },
  { museum: 'khm', name: 'Portrait of Archduchess Maria', zh: '玛丽亚女大公肖像' },

  // ── 俄罗斯·艾尔米塔什（+18）────────────────
  { museum: 'hermitage', name: 'Madonna Benois', zh: '持花圣母（贝诺瓦圣母）' },
  { museum: 'hermitage', name: 'The Return of the Prodigal Son (Rembrandt)', zh: '浪子回头（伦勃朗）' },
  { museum: 'hermitage', name: 'Crouching Boy (Michelangelo)', zh: '蹲着的男孩（米开朗基罗）' },
  { museum: 'hermitage', name: 'Gypsy Girl (Rembrandt)', zh: '吉普赛女郎（伦勃朗）' },
  { museum: 'hermitage', name: 'The Holy Family (Rembrandt)', zh: '圣家族（伦勃朗）' },
  { museum: 'hermitage', name: 'Bathsheba (Rembrandt)', zh: '拔示巴（伦勃朗）' },
  { museum: 'hermitage', name: 'Dana\u00eb (Rembrandt)', zh: '达娜厄（伦勃朗）' },
  { museum: 'hermitage', name: 'Madonna Litta', zh: '利塔圣母' },
  { museum: 'hermitage', name: 'Peacock Clock', zh: '孔雀钟' },
  { museum: 'hermitage', name: 'The Lute Player (Caravaggio)', zh: '鲁特琴演奏者（卡拉瓦乔）' },
  { museum: 'hermitage', name: 'The Annunciation (van Eyck)', zh: '天使报喜（凡·艾克）' },
  { museum: 'hermitage', name: 'Judith (Giorgione)', zh: '犹滴（乔尔乔内）' },
  { museum: 'hermitage', name: 'The Entombment (Titian)', zh: '基督下葬（提香）' },
  { museum: 'hermitage', name: 'Perseus and Andromeda (Rubens)', zh: '珀耳修斯与安德洛墨达（鲁本斯）' },
  { museum: 'hermitage', name: 'Portrait of a Young Man (Bronzino)', zh: '青年肖像（布龙齐诺）' },
  { museum: 'hermitage', name: 'The Last Supper (Bassano)', zh: '最后的晚餐（巴萨诺）' },
  { museum: 'hermitage', name: 'Venus and Cupid (Titian)', zh: '维纳斯与丘比特（提香）' },
  { museum: 'hermitage', name: 'Landscape with a Rainbow (Rubens)', zh: '彩虹风景（鲁本斯）' },

  // ── 梵蒂冈博物馆（+18）─────────────────────
  { museum: 'vatican', name: 'Apollo Belvedere', zh: '观景殿的阿波罗' },
  { museum: 'vatican', name: 'Belvedere Torso', zh: '观景殿的躯干' },
  { museum: 'vatican', name: 'The Creation of Adam', zh: '创造亚当' },
  { museum: 'vatican', name: 'The Last Judgment (Michelangelo)', zh: '最后的审判（米开朗基罗）' },
  { museum: 'vatican', name: 'The School of Athens', zh: '雅典学院' },
  { museum: 'vatican', name: 'Disputation of the Holy Sacrament', zh: '圣礼之争' },
  { museum: 'vatican', name: 'The Parnassus (Raphael)', zh: '帕纳塞斯山（拉斐尔）' },
  { museum: 'vatican', name: 'The Expulsion of Heliodorus', zh: '埃利奥多罗被逐出圣殿' },
  { museum: 'vatican', name: 'The Mass at Bolsena', zh: '博尔塞纳的弥撒' },
  { museum: 'vatican', name: 'The Fire in the Borgo', zh: '波尔戈大火' },
  { museum: 'vatican', name: 'The Meeting of Leo the Great and Attila', zh: '利奥一世与阿提拉会面' },
  { museum: 'vatican', name: 'The Deliverance of Saint Peter', zh: '圣彼得获释' },
  { museum: 'vatican', name: 'Nile god (Vatican)', zh: '尼罗河神' },
  { museum: 'vatican', name: 'Augustus of Prima Porta', zh: '奥古斯都像（普里马波尔塔）' },
  { museum: 'vatican', name: 'Laoco\u00f6n and His Sons', zh: '拉奥孔群像' },
  { museum: 'vatican', name: 'The Gallery of Maps', zh: '地图长廊' },
  { museum: 'vatican', name: 'The Sistine Chapel ceiling', zh: '西斯廷礼拜堂天顶画' },
  { museum: 'vatican', name: 'Raphael Rooms', zh: '拉斐尔画室' },

  // ── 日本·东京国立（+16）────────────────────
  { museum: 'tokyo-national', name: 'Pine Trees screen (Hasegawa T\u014dhaku)', zh: '松林图屏风（长谷川等伯）' },
  { museum: 'tokyo-national', name: 'Red and White Plum Blossoms (K\u014drin)', zh: '红白梅图屏风（尾形光琳）' },
  { museum: 'tokyo-national', name: 'Wind and Thunder Gods screen (S\u014dtatsu)', zh: '风神雷神图屏风（俵屋宗达）' },
  { museum: 'tokyo-national', name: 'Yohen Tenmoku tea bowl', zh: '曜变天目茶碗' },
  { museum: 'tokyo-national', name: 'Haniwa warrior in keik\u014d armor', zh: '埴轮·挂甲武人' },
  { museum: 'tokyo-national', name: 'Landscape in autumn and winter (Sessh\u016b)', zh: '秋冬山水图（雪舟）' },
  { museum: 'tokyo-national', name: 'Landscape in the snow (Sessh\u016b)', zh: '雪景山水图（雪舟）' },
  { museum: 'tokyo-national', name: 'Scenes in and around Kyoto', zh: '洛中洛外图屏风' },
  { museum: 'tokyo-national', name: 'Colourful Realm of Living Beings (Jakuch\u016b)', zh: '动植彩绘（伊藤若冲）' },
  { museum: 'tokyo-national', name: 'Lion and Peonies screen (Kan\u014d Eitoku)', zh: '唐狮子图屏风（狩野永德）' },
  { museum: 'tokyo-national', name: 'Mandala of the Womb Realm', zh: '胎藏界曼荼罗' },
  { museum: 'tokyo-national', name: 'Standing Kannon statue', zh: '观世音菩萨立像' },
  { museum: 'tokyo-national', name: 'National Treasure tachi sword', zh: '太刀（铭 来国俊）' },
  { museum: 'tokyo-national', name: 'Shigaraki tea jar', zh: '信乐茶壶' },
  { museum: 'tokyo-national', name: 'Buddhist Guardian King statues', zh: '四天王立像' },
  { museum: 'tokyo-national', name: 'Genji Monogatari picture scroll', zh: '源氏物语绘卷' },

  // ── 韩国·国立中央博物馆（+16）──────────────
  { museum: 'korea-national', name: 'Baekje Gilt-bronze Incense Burner', zh: '百济金铜大香炉' },
  { museum: 'korea-national', name: 'Silla gold crown', zh: '新罗金冠' },
  { museum: 'korea-national', name: 'Gilt-bronze Maitreya in Meditation', zh: '金铜半跏思惟像' },
  { museum: 'korea-national', name: 'Celadon incense burner with openwork lid', zh: '青瓷镂空香炉' },
  { museum: 'korea-national', name: 'Celadon plum vase with inlaid crane', zh: '高丽青瓷象嵌云鹤文梅瓶' },
  { museum: 'korea-national', name: 'Celadon prunus vase with plum blossom', zh: '青瓷梅瓶' },
  { museum: 'korea-national', name: 'Silla gold belt', zh: '新罗金制腰带' },
  { museum: 'korea-national', name: 'Gold earrings from Silla', zh: '新罗金耳饰' },
  { museum: 'korea-national', name: 'Stone pagoda of Mireuksa', zh: '弥勒寺石塔' },
  { museum: 'korea-national', name: 'Dharani sutra (Mugujeonggwang)', zh: '无垢净光大陀罗尼经' },
  { museum: 'korea-national', name: 'Gilt-bronze Standing Buddha', zh: '金铜如来立像' },
  { museum: 'korea-national', name: 'Blue and white porcelain jar', zh: '青花白瓷大壶' },
  { museum: 'korea-national', name: 'White porcelain moon jar', zh: '白瓷月亮罐' },
  { museum: 'korea-national', name: 'Bronze mirror with geometric patterns', zh: '青铜几何纹镜' },
  { museum: 'korea-national', name: 'Crown of Baekje', zh: '百济金冠' },
  { museum: 'korea-national', name: 'Bronze ritual bell of Seongdeok', zh: '圣德大王神钟（奉德寺钟）' },

  // ── 挪威（+18）─────────────────────────────
  { museum: 'norway-national', name: 'The Girls on the Bridge', zh: '桥上的女孩' },
  { museum: 'norway-national', name: 'Madonna (Munch)', zh: '圣母（蒙克）' },
  { museum: 'norway-national', name: 'Vampire (Munch)', zh: '吸血鬼（蒙克）' },
  { museum: 'norway-national', name: 'The Dance of Life', zh: '生命之舞' },
  { museum: 'norway-national', name: 'Evening on Karl Johan', zh: '卡尔·约翰大街的傍晚' },
  { museum: 'norway-national', name: 'Ashes (Munch)', zh: '灰烬（蒙克）' },
  { museum: 'norway-national', name: 'Puberty (Munch)', zh: '青春期（蒙克）' },
  { museum: 'norway-national', name: 'Jealousy (Munch)', zh: '嫉妒（蒙克）' },
  { museum: 'norway-national', name: 'Separation (Munch)', zh: '分离（蒙克）' },
  { museum: 'norway-national', name: 'The Kiss (Munch)', zh: '吻（蒙克）' },
  { museum: 'norway-national', name: 'The Sun (Munch)', zh: '太阳（蒙克）' },
  { museum: 'norway-national', name: 'Melancholy (Munch)', zh: '忧郁（蒙克）' },
  { museum: 'norway-national', name: 'Anxiety (Munch)', zh: '焦虑（蒙克）' },
  { museum: 'norway-national', name: 'Self-Portrait with Cigarette', zh: '持烟自画像（蒙克）' },
  { museum: 'norway-national', name: 'The Scream', zh: '呐喊' },
  { museum: 'norway-national', name: 'The Sick Child (Munch)', zh: '病中的孩子（蒙克）' },
  { museum: 'norway-national', name: 'Winter in the Mountains', zh: '山中冬日' },
  { museum: 'norway-national', name: 'The Storm (Munch)', zh: '风暴（蒙克）' },

  // ══════════════ V1.2 扩充（补齐短缺地区至≥20） ══════════════

  // ── 梵蒂冈（+6）──────────────────────────
  { museum: 'vatican', name: 'The Transfiguration (Raphael)', zh: '基督显圣（拉斐尔）' },
  { museum: 'vatican', name: 'Madonna di Foligno', zh: '福利尼奥的圣母' },
  { museum: 'vatican', name: 'The Entombment (Caravaggio)', zh: '基督下葬（卡拉瓦乔）' },
  { museum: 'vatican', name: 'Saint Jerome in the Wilderness (Leonardo)', zh: '荒野中的圣杰罗姆（达·芬奇）' },
  { museum: 'vatican', name: 'The Deposition (Raphael)', zh: '基督被解下十字架（拉斐尔）' },
  { museum: 'vatican', name: 'Sistine Chapel frescoes (Michelangelo)', zh: '西斯廷礼拜堂壁画（米开朗基罗）' },

  // ── 意大利·乌菲兹（+12）──────────────────
  { museum: 'uffizi', name: 'Ognissanti Madonna (Giotto)', zh: '万圣节圣母（乔托）' },
  { museum: 'uffizi', name: 'Santa Trinita Maest\u00e0 (Cimabue)', zh: '圣三一圣母像（契马布埃）' },
  { museum: 'uffizi', name: 'Rucellai Madonna (Duccio)', zh: '鲁切拉伊圣母（杜乔）' },
  { museum: 'uffizi', name: 'Annunciation (Filippo Lippi)', zh: '天使报喜（菲利波·利皮）' },
  { museum: 'uffizi', name: 'Adoration of the Magi (Gentile da Fabriano)', zh: '三博士来朝（真蒂莱·达·法布里亚诺）' },
  { museum: 'uffizi', name: 'The Baptism of Christ (Leonardo)', zh: '基督受洗（达·芬奇）' },
  { museum: 'uffizi', name: 'Madonna of the Magnificat (Botticelli)', zh: '圣母赞歌（波提切利）' },
  { museum: 'uffizi', name: 'The Adoration of the Magi (Botticelli)', zh: '三博士来朝（波提切利）' },
  { museum: 'uffizi', name: 'Saint Cecilia (Raphael)', zh: '圣塞西莉亚（拉斐尔）' },
  { museum: 'uffizi', name: 'Venus of Urbino (Titian)', zh: '乌尔比诺的维纳斯（提香）' },
  { museum: 'uffizi', name: 'Holy Family (Michelangelo)', zh: '圣家族（米开朗基罗）' },
  { museum: 'uffizi', name: 'The Lute Player (Caravaggio, Uffizi)', zh: '鲁特琴手（卡拉瓦乔）' },

  // ── 西班牙·普拉多/索菲亚（+14）────────────
  { museum: 'prado', name: 'The Surrender of Breda', zh: '布雷达的投降' },
  { museum: 'prado', name: 'Equestrian Portrait of Charles V (Titian)', zh: '查理五世骑马像（提香）' },
  { museum: 'prado', name: 'La Gloria (Titian)', zh: '荣耀（提香）' },
  { museum: 'prado', name: 'The Judgment of Paris (Rubens)', zh: '帕里斯的评判（鲁本斯）' },
  { museum: 'prado', name: 'The Haywain Triptych (Bosch)', zh: '干草车三连画（博斯）' },
  { museum: 'prado', name: 'The Seven Deadly Sins (Bosch)', zh: '七宗罪（博斯）' },
  { museum: 'prado', name: 'Christ Crucified (Vel\u00e1zquez)', zh: '十字架上的基督（委拉斯开兹）' },
  { museum: 'prado', name: 'The Holy Trinity (El Greco)', zh: '圣三位一体（埃尔·格列柯）' },
  { museum: 'prado', name: 'The Annunciation (Fra Angelico)', zh: '天使报喜（弗拉·安吉利科）' },
  { museum: 'prado', name: 'The Colossus (Goya)', zh: '巨人（戈雅）' },
  { museum: 'prado', name: 'The Witches\u2019 Sabbath (Goya)', zh: '女巫的安息日（戈雅）' },
  { museum: 'prado', name: 'Saint Serapion (Zurbar\u00e1n)', zh: '圣塞拉皮翁（苏巴朗）' },
  { museum: 'prado', name: 'The Adoration of the Shepherds (El Greco)', zh: '牧羊人的朝拜（埃尔·格列柯）' },
  { museum: 'prado', name: 'The Two Trinities (Murillo)', zh: '双重三位一体（牟利罗）' },

  // ── 俄罗斯·艾尔米塔什（+14）──────────────
  { museum: 'hermitage', name: 'The Dance II (Matisse)', zh: '舞蹈II（马蒂斯）' },
  { museum: 'hermitage', name: 'Music (Matisse)', zh: '音乐（马蒂斯）' },
  { museum: 'hermitage', name: 'Harmony in Red (Matisse)', zh: '红色和谐（马蒂斯）' },
  { museum: 'hermitage', name: 'Arena at Arles (Van Gogh)', zh: '阿尔勒的竞技场（梵高）' },
  { museum: 'hermitage', name: 'The Smoker (C\u00e9zanne)', zh: '吸烟者（塞尚）' },
  { museum: 'hermitage', name: 'Tahitian Pastorale (Gauguin)', zh: '塔希提田园诗（高更）' },
  { museum: 'hermitage', name: 'Portrait of Actress Jeanne Samary (Renoir)', zh: '女演员让娜·萨马里（雷诺阿）' },
  { museum: 'hermitage', name: 'The Descent from the Cross (Rubens)', zh: '基督下十字架（鲁本斯）' },
  { museum: 'hermitage', name: 'Saint Sebastian (Titian)', zh: '圣塞巴斯蒂安（提香）' },
  { museum: 'hermitage', name: 'Venus and Adonis (Titian)', zh: '维纳斯与阿多尼斯（提香）' },
  { museum: 'hermitage', name: 'The Breakfast (Vel\u00e1zquez)', zh: '早餐（委拉斯开兹）' },
  { museum: 'hermitage', name: 'Portrait of an Old Man (Rembrandt)', zh: '老人肖像（伦勃朗）' },
  { museum: 'hermitage', name: 'The Holy Family with Saint Elizabeth', zh: '圣家族与圣伊丽莎白' },
  { museum: 'hermitage', name: 'Landscape with the Flight into Egypt (Claude Lorrain)', zh: '逃往埃及的风景（克劳德·洛兰）' },

  // ── 奥地利·艺术史博物馆（+14）────────────
  { museum: 'khm', name: 'Winter (Arcimboldo)', zh: '冬（阿尔钦博托）' },
  { museum: 'khm', name: 'Summer (Arcimboldo)', zh: '夏（阿尔钦博托）' },
  { museum: 'khm', name: 'Water (Arcimboldo)', zh: '水（阿尔钦博托）' },
  { museum: 'khm', name: 'Earth (Arcimboldo)', zh: '土（阿尔钦博托）' },
  { museum: 'khm', name: 'Fire (Arcimboldo)', zh: '火（阿尔钦博托）' },
  { museum: 'khm', name: 'The Conversion of Saint Paul (Bruegel)', zh: '圣保罗的皈依（勃鲁盖尔）' },
  { museum: 'khm', name: 'The Suicide of Saul (Bruegel)', zh: '扫罗的自杀（勃鲁盖尔）' },
  { museum: 'khm', name: 'The Girl in a Fur Wrap (Titian)', zh: '穿皮草的少女（提香）' },
  { museum: 'khm', name: 'The Penitent Magdalene (Titian)', zh: '忏悔的抹大拉（提香）' },
  { museum: 'khm', name: 'Madonna with the Beardless Joseph (Raphael)', zh: '圣母子与无胡须的约瑟（拉斐尔）' },
  { museum: 'khm', name: 'The Slaughtered Ox (Rembrandt)', zh: '被宰杀的牛（伦勃朗）' },
  { museum: 'khm', name: 'Saint Margaret (Rubens)', zh: '圣玛格丽特（鲁本斯）' },
  { museum: 'khm', name: 'The Marriage at Cana (Veronese)', zh: '迦拿的婚礼（委罗内塞）' },
  { museum: 'khm', name: 'Portrait of a Man (D\u00fcrer)', zh: '男子肖像（丢勒）' },

  // ── 台北故宫（+20）───────────────────────
  { museum: 'npm-taipei', name: 'Poem for the Pine Wind Pavilion (Huang Tingjian)', zh: '花气薰人帖' },
  { museum: 'npm-taipei', name: 'Autumn Colours on the Qiao and Hua Mountains', zh: '鹊华秋色图' },
  { museum: 'npm-taipei', name: 'Jade bitter melon', zh: '白玉苦瓜' },
  { museum: 'npm-taipei', name: 'Copy of the Lantingji Xu (Dingwu)', zh: '定武兰亭序' },
  { museum: 'npm-taipei', name: 'Su Shi\u2019s Rhapsody on the Red Cliff', zh: '赤壁赋（苏轼）' },
  { museum: 'npm-taipei', name: 'Cursive script scroll (Huai Su, Taipei)', zh: '自叙帖（怀素）' },
  { museum: 'npm-taipei', name: 'The Thirteen Posthumous Edicts (Tang Taizong)', zh: '十三行帖（唐太宗）' },
  { museum: 'npm-taipei', name: 'Cloisonn\u00e9 enamel vase (Qing)', zh: '掐丝珐琅瓶（清）' },
  { museum: 'npm-taipei', name: 'Jadeite cabbage with two insects', zh: '翠玉白菜（双虫）' },
  { museum: 'npm-taipei', name: 'Porcelain pillow in the shape of a child (Ding ware)', zh: '定窑白瓷孩儿枕' },
  { museum: 'npm-taipei', name: 'Ru ware water basin (Taipei)', zh: '汝窑水仙盆（台北）' },
  { museum: 'npm-taipei', name: 'Jade bi disc (Warring States)', zh: '战国玉璧' },
  { museum: 'npm-taipei', name: 'Gilt-bronze Mauryan-style Buddha', zh: '鎏金铜佛立像' },
  { museum: 'npm-taipei', name: 'Blue-and-white porcelain jar (Ming)', zh: '明青花罐' },
  { museum: 'npm-taipei', name: 'Painted pottery horse (Tang)', zh: '唐三彩马' },
  { museum: 'npm-taipei', name: 'The Hundred Birds scroll (Bian Jingzhao)', zh: '百鸟图（边景昭）' },
  { museum: 'npm-taipei', name: 'Landscape after rain (Mi Youren)', zh: '潇湘奇观图（米友仁）' },
  { museum: 'npm-taipei', name: 'Bamboo and rocks (Zheng Xie)', zh: '竹石图（郑燮）' },
  { museum: 'npm-taipei', name: 'Portrait of Lady Wenji returning to Han', zh: '文姬归汉图' },

  // ── 挪威（+20）───────────────────────────
  { museum: 'norway-national', name: 'Death of Marat (Munch)', zh: '马拉之死（蒙克）' },
  { museum: 'norway-national', name: 'Night in Saint-Cloud', zh: '圣克卢之夜' },
  { museum: 'norway-national', name: 'The Voice (Munch)', zh: '声音（蒙克）' },
  { museum: 'norway-national', name: 'Workers on Their Way Home', zh: '回家的工人' },
  { museum: 'norway-national', name: 'Self-Portrait with Skeleton Arm', zh: '骷髅手臂自画像' },
  { museum: 'norway-national', name: 'Between the Clock and the Bed', zh: '钟与床之间' },
  { museum: 'norway-national', name: 'History (Munch)', zh: '历史（蒙克）' },
  { museum: 'norway-national', name: 'The Death of the Mother', zh: '母亲之死' },
  { museum: 'norway-national', name: 'The Murderer (Munch)', zh: '凶手（蒙克）' },
  { museum: 'norway-national', name: 'Golgotha (Munch)', zh: '各各他（蒙克）' },
  { museum: 'norway-national', name: 'The Dance of Life (Munch)', zh: '生命之舞（蒙克）' },
  { museum: 'norway-national', name: 'Melancholy (Munch)', zh: '忧郁（蒙克）' },
  { museum: 'norway-national', name: 'Jealousy (Munch)', zh: '嫉妒（蒙克）' },
  { museum: 'norway-national', name: 'Vampire (Munch)', zh: '吸血鬼（蒙克）' },
  { museum: 'norway-national', name: 'Madonna (Munch)', zh: '圣母（蒙克）' },
  { museum: 'norway-national', name: 'The Girls on the Bridge', zh: '桥上的女孩' },
  { museum: 'norway-national', name: 'Puberty (Munch)', zh: '青春期（蒙克）' },
  { museum: 'norway-national', name: 'Anxiety (Munch)', zh: '焦虑（蒙克）' },
  { museum: 'norway-national', name: 'The Sun (Munch)', zh: '太阳（蒙克）' },
  { museum: 'norway-national', name: 'Winter in the Mountains (Munch)', zh: '山中冬日（蒙克）' },

  // ── 日本·东京国立（+26，含日文名）────────
  { museum: 'tokyo-national', name: 'Pine Trees screen (T\u014dhaku)', zh: '松林图屏风', ja: '松林図屏風' },
  { museum: 'tokyo-national', name: 'Red and White Plum Blossoms (K\u014drin)', zh: '红白梅图屏风', ja: '紅白梅図屏風' },
  { museum: 'tokyo-national', name: 'Wind and Thunder Gods (S\u014dtatsu)', zh: '风神雷神图屏风', ja: '風神雷神図屏風' },
  { museum: 'tokyo-national', name: 'Yohen Tenmoku tea bowl', zh: '曜变天目茶碗', ja: '曜変天目' },
  { museum: 'tokyo-national', name: 'Haniwa warrior in armor', zh: '埴轮·挂甲武人', ja: '埴輪 挂甲の武人' },
  { museum: 'tokyo-national', name: 'Autumn and Winter Landscapes (Sessh\u016b)', zh: '秋冬山水图', ja: '秋冬山水図' },
  { museum: 'tokyo-national', name: 'Snowy Landscape (Sessh\u016b)', zh: '雪景山水图', ja: '雪景山水図' },
  { museum: 'tokyo-national', name: 'Scenes in and around Kyoto', zh: '洛中洛外图屏风', ja: '洛中洛外図屏風' },
  { museum: 'tokyo-national', name: 'Colourful Realm of Living Beings (Jakuch\u016b)', zh: '动植彩绘', ja: '動植綵絵' },
  { museum: 'tokyo-national', name: 'Genji Monogatari Emaki', zh: '源氏物语绘卷', ja: '源氏物語絵巻' },
  { museum: 'tokyo-national', name: 'Mandala of the Womb Realm', zh: '胎藏界曼荼罗', ja: '胎蔵界曼荼羅' },
  { museum: 'tokyo-national', name: 'Kannon Bodhisattva statue', zh: '观世音菩萨立像', ja: '観音菩薩立像' },
  { museum: 'tokyo-national', name: 'National Treasure tachi (Rai Kunimitsu)', zh: '太刀·来国俊', ja: '太刀 銘 来国俊' },
  { museum: 'tokyo-national', name: 'Lion dance mask (Bugaku)', zh: '狮子舞面（舞乐）', ja: '獅子舞面' },
  { museum: 'tokyo-national', name: 'Tale of the Heike scroll', zh: '平家物语绘卷', ja: '平家物語絵巻' },
  { museum: 'tokyo-national', name: 'Portrait of Minamoto no Yoritomo', zh: '源赖朝像', ja: '源頼朝像' },
  { museum: 'tokyo-national', name: 'Nachi waterfall mandala', zh: '那智泷图', ja: '那智瀧図' },
  { museum: 'tokyo-national', name: 'Shigisan Engi scroll', zh: '信贵山缘起绘卷', ja: '信貴山縁起絵巻' },
  { museum: 'tokyo-national', name: 'The Burning of the Sanj\u014d Palace', zh: '三条殿烧讨图', ja: '三条殿焼討図' },
  { museum: 'tokyo-national', name: 'Wisteria and bird (Sotatsu school)', zh: '藤花图', ja: '藤花図' },
  { museum: 'tokyo-national', name: 'Fud\u014d My\u014d\u014d statue', zh: '不动明王坐像', ja: '不動明王坐像' },
  { museum: 'tokyo-national', name: 'Bishamonten statue', zh: '毗沙门天立像', ja: '毘沙門天立像' },
  { museum: 'tokyo-national', name: 'Tea bowl named Inaba Tenmoku', zh: '稻叶天目茶碗', ja: '稲葉天目' },
  { museum: 'tokyo-national', name: 'Karatsu tea bowl', zh: '唐津茶碗', ja: '唐津茶碗' },
  { museum: 'tokyo-national', name: 'Honda Toshiaki portrait', zh: '本多利明像', ja: '本多利明像' },
  { museum: 'tokyo-national', name: 'Nobori (battle standard)', zh: '战国旗印', ja: '旗印' },

  // ── 韩国·国立中央博物馆（+26，含韩文名）──
  { museum: 'korea-national', name: 'Gilt-bronze Maitreya in Meditation', zh: '金铜半跏思惟像', ko: '금동반가사유상' },
  { museum: 'korea-national', name: 'Silla gold crown', zh: '新罗金冠', ko: '신라 금관' },
  { museum: 'korea-national', name: 'Baekje Gilt-bronze Incense Burner', zh: '百济金铜大香炉', ko: '백제금동대향로' },
  { museum: 'korea-national', name: 'Celadon incense burner with openwork lid', zh: '青瓷镂空香炉', ko: '청자 향로' },
  { museum: 'korea-national', name: 'Celadon plum vase with inlaid crane', zh: '青瓷象嵌云鹤文梅瓶', ko: '청자 상감운학문 매병' },
  { museum: 'korea-national', name: 'White porcelain moon jar', zh: '白瓷月亮罐', ko: '백자 달항아리' },
  { museum: 'korea-national', name: 'Silla gold belt', zh: '新罗金腰带', ko: '신라 금제 허리띠' },
  { museum: 'korea-national', name: 'Gold earrings from Silla', zh: '新罗金耳饰', ko: '신라 금귀걸이' },
  { museum: 'korea-national', name: 'Mireuksa stone pagoda', zh: '弥勒寺石塔', ko: '미륵사지 석탑' },
  { museum: 'korea-national', name: 'Mugujeonggwang Dharani sutra', zh: '无垢净光大陀罗尼经', ko: '무구정광대다라니경' },
  { museum: 'korea-national', name: 'Blue-and-white porcelain jar with plum', zh: '青花白瓷梅竹纹壶', ko: '청화백자 매죽문 호' },
  { museum: 'korea-national', name: 'Crown of Baekje', zh: '百济金冠', ko: '백제 금동관' },
  { museum: 'korea-national', name: 'Seongdeok Divine Bell', zh: '圣德大王神钟', ko: '성덕대왕신종' },
  { museum: 'korea-national', name: 'Gilt-bronze Standing Buddha', zh: '金铜如来立像', ko: '금동여래입상' },
  { museum: 'korea-national', name: 'Bronze mirror with geometric patterns', zh: '青铜几何纹镜', ko: '청동 기하문경' },
  { museum: 'korea-national', name: 'Celadon prunus vase with plum blossom', zh: '青瓷梅瓶', ko: '청자 매병' },
  { museum: 'korea-national', name: 'Silla gold crown with spangles', zh: '新罗金冠（细饰）', ko: '신라 금관' },
  { museum: 'korea-national', name: 'Stone seated Buddha (Goryeo)', zh: '高丽石佛坐像', ko: '고려 석불좌상' },
  { museum: 'korea-national', name: 'Bronze ritual bell with dragon loop', zh: '青铜龙纽钟', ko: '청동 용뉴종' },
  { museum: 'korea-national', name: 'Gilt-bronze Bodhisattva of Compassion', zh: '金铜观音菩萨立像', ko: '금동관음보살입상' },
  { museum: 'korea-national', name: 'Celadon lotus water dropper', zh: '青瓷莲瓣水滴', ko: '청자 연판연적' },
  { museum: 'korea-national', name: 'Earthenware duck-shaped vessel', zh: '鸭形陶器', ko: '오리모양 토기' },
  { museum: 'korea-national', name: 'Gold crown from Geumgwanchong', zh: '金冠冢金冠', ko: '금관총 금관' },
  { museum: 'korea-national', name: 'Bronze dagger with stylized hilt', zh: '青铜剑', ko: '청동검' },
  { museum: 'korea-national', name: 'Stone pagoda model (Silla)', zh: '新罗石塔模型', ko: '신라 석탑' },
  { museum: 'korea-national', name: 'Celadon dragon-shaped ewer', zh: '青瓷龙形注子', ko: '청자 용형 주자' },

  // ══════════════ V1.2b 补强（日/韩/挪 + 西/俄/奥保险） ══════════════

  // 日本（+10）
  { museum: 'tokyo-national', name: 'Red Fuji (Hokusai)', zh: '凯风快晴（北斋）', ja: '凱風快晴' },
  { museum: 'tokyo-national', name: 'The Fifty-three Stations of the T\u014dkaid\u014d (Hiroshige)', zh: '东海道五十三次（广重）', ja: '東海道五十三次' },
  { museum: 'tokyo-national', name: 'Rising Sun and Phoenix (Jakuch\u016b)', zh: '旭日凤凰图（若冲）', ja: '旭日鳳凰図' },
  { museum: 'tokyo-national', name: 'Shigaraki Jar', zh: '信乐茶壶', ja: '信楽茶壺' },
  { museum: 'tokyo-national', name: 'Landscape (Sessh\u016b)', zh: '山水图（雪舟）', ja: '山水図' },
  { museum: 'tokyo-national', name: 'Hotei crossing a river', zh: '布袋渡河图', ja: '布袋渡河図' },
  { museum: 'tokyo-national', name: 'The Tale of Genji scroll (TNM)', zh: '源氏物语绘卷（东京国立）', ja: '源氏物語絵巻' },
  { museum: 'tokyo-national', name: 'Portrait of Takauji Ashikaga', zh: '足利尊氏像', ja: '足利尊氏像' },
  { museum: 'tokyo-national', name: 'Mandala of the Diamond Realm', zh: '金刚界曼荼罗', ja: '金剛界曼荼羅' },
  { museum: 'tokyo-national', name: 'Fugen Bosatsu statue', zh: '普贤菩萨像', ja: '普賢菩薩像' },

  // 韩国（+10）
  { museum: 'korea-national', name: 'Earthenware jar with human figures', zh: '人面纹陶壶', ko: '인면문 토기' },
  { museum: 'korea-national', name: 'Gayageum (zither)', zh: '伽倻琴', ko: '가야금' },
  { museum: 'korea-national', name: 'Celadon ewer in the shape of a monkey', zh: '青瓷猴形注子', ko: '청자 원숭이 모양 주자' },
  { museum: 'korea-national', name: 'Gilt-bronze triad Buddha', zh: '金铜三尊佛', ko: '금동삼존불' },
  { museum: 'korea-national', name: 'Stone seated Buddha (Baekje)', zh: '百济石佛坐像', ko: '백제 석불좌상' },
  { museum: 'korea-national', name: 'Gold necklace from Geumgwanchong', zh: '金冠冢金项链', ko: '금관총 목걸이' },
  { museum: 'korea-national', name: 'Bronze incense burner with phoenix', zh: '青铜凤纹香炉', ko: '청동 봉황문 향로' },
  { museum: 'korea-national', name: 'Celadon gourd-shaped ewer', zh: '青瓷葫芦形注子', ko: '청자 표주박 모양 주자' },
  { museum: 'korea-national', name: 'Stone Buddhist stele (Silla)', zh: '新罗佛教石碑', ko: '신라 불교 비' },
  { museum: 'korea-national', name: 'Glass cup from Silla', zh: '新罗玻璃杯', ko: '신라 유리잔' },

  // 挪威（+10）
  { museum: 'norway-national', name: 'Death in the Sickroom', zh: '病室里的死亡' },
  { museum: 'norway-national', name: 'The Girls on the Pier', zh: '码头上的女孩' },
  { museum: 'norway-national', name: 'The Sick Child (Munch, 1907)', zh: '病中的孩子（1907版）' },
  { museum: 'norway-national', name: 'Spring (Munch)', zh: '春天（蒙克）' },
  { museum: 'norway-national', name: 'The Bridge (Munch)', zh: '桥（蒙克）' },
  { museum: 'norway-national', name: 'Winter Night (Munch)', zh: '冬夜（蒙克）' },
  { museum: 'norway-national', name: 'The Funeral (Munch)', zh: '葬礼（蒙克）' },
  { museum: 'norway-national', name: 'Young Woman on the Beach', zh: '沙滩上的年轻女子' },
  { museum: 'norway-national', name: 'The Eye (Munch)', zh: '眼睛（蒙克）' },
  { museum: 'norway-national', name: 'Self-Portrait (Munch, 1902)', zh: '自画像（蒙克1902）' },

  // 西班牙（+4 保险）
  { museum: 'prado', name: 'The Second of May 1808', zh: '1808年5月2日' },
  { museum: 'prado', name: 'The Family of Philip IV (Las Meninas alt.)', zh: '菲利普四世一家' },
  { museum: 'reina-sofia', name: 'Femme en pleurs (Picasso)', zh: '哭泣的女人（毕加索）' },
  { museum: 'reina-sofia', name: 'La Berceuse (Picasso)', zh: '摇篮曲（毕加索）' },

  // 俄罗斯（+4 保险）
  { museum: 'hermitage', name: 'The Empire of Flora (Poussin)', zh: '花神的王国（普桑）' },
  { museum: 'hermitage', name: 'The Toilet of Venus (Rubens)', zh: '维纳斯的梳妆（鲁本斯）' },
  { museum: 'hermitage', name: 'Portrait of an Old Woman (Rembrandt)', zh: '老妇肖像（伦勃朗）' },
  { museum: 'hermitage', name: 'Still Life with a Candle (Stoskopff)', zh: '烛光静物（斯托斯科夫）' },

  // 奥地利（+4 保险）
  { museum: 'khm', name: 'The Carrying of the Cross (Bruegel)', zh: '背负十字架（勃鲁盖尔）' },
  { museum: 'khm', name: 'The Death of the Virgin (Bruegel)', zh: '圣母之死（勃鲁盖尔）' },
  { museum: 'khm', name: 'The Beekeepers (Bruegel)', zh: '养蜂人（勃鲁盖尔）' },
  { museum: 'khm', name: 'Portrait of Archduchess Isabella (Rubens)', zh: '伊莎贝拉女大公像（鲁本斯）' },

  // ── 韩国补量（+4）───────────────────────
  { museum: 'korea-national', name: 'Celadon melon-shaped bottle', zh: '青瓷甜瓜形瓶', ko: '청자 참외모양 병' },
  { museum: 'korea-national', name: 'Inlaid celadon peony plum vase', zh: '青瓷象嵌牡丹文梅瓶', ko: '청자 상감모란문 매병' },
  { museum: 'korea-national', name: 'Bronze seal with turtle knob', zh: '青铜龟钮印', ko: '청동 거북이 인장' },
  { museum: 'korea-national', name: 'Gold ring from Silla', zh: '新罗金戒指', ko: '신라 금반지' },

  // ══════════════ V1.2c 补量（去重后补齐至≥20） ══════════════

  // 荷兰（+4）
  { museum: 'rijksmuseum', name: 'The Little Street', zh: '代尔夫特小巷' },
  { museum: 'rijksmuseum', name: 'The Staalmeesters', zh: '斯塔尔梅斯特（布商行会理事）' },
  { museum: 'rijksmuseum', name: 'Portrait of a Couple (Hals)', zh: '夫妇肖像（哈尔斯）' },
  { museum: 'van-gogh', name: 'The Parsonage Garden at Nuenen', zh: '纽南的牧师花园' },

  // 挪威（+4）
  { museum: 'norway-national', name: 'Starry Night (Munch)', zh: '星光之夜（蒙克）' },
  { museum: 'norway-national', name: 'Moonlight (Munch)', zh: '月光（蒙克）' },
  { museum: 'norway-national', name: 'Summer Night\u2019s Dream (Munch)', zh: '夏夜之梦（蒙克）' },
  { museum: 'norway-national', name: 'The Brooch (Munch)', zh: '胸针（蒙克）' },

  // 日本（+6）
  { museum: 'tokyo-national', name: 'M\u014dko Sh\u016brai Ekotoba', zh: '蒙古袭来绘词', ja: '蒙古襲来絵詞' },
  { museum: 'tokyo-national', name: 'Ippen Sh\u014dnin eden', zh: '一遍圣绘', ja: '一遍聖絵' },
  { museum: 'tokyo-national', name: 'Genj\u014d Sanz\u014d e', zh: '玄奘三藏绘', ja: '玄奘三蔵絵' },
  { museum: 'tokyo-national', name: 'Sh\u014dtoku Taishi eden', zh: '圣德太子绘传', ja: '聖徳太子絵伝' },
  { museum: 'tokyo-national', name: 'Jigoku-z\u014dshi', zh: '地狱草纸', ja: '地獄草紙' },
  { museum: 'tokyo-national', name: 'Heiji Monogatari Emaki', zh: '平治物语绘卷', ja: '平治物語絵巻' },

  // 梵蒂冈（+5）
  { museum: 'vatican', name: 'The Flood (Sistine Ceiling)', zh: '大洪水（西斯廷天顶）' },
  { museum: 'vatican', name: 'The Libyan Sibyl', zh: '利比亚女先知' },
  { museum: 'vatican', name: 'The Delphic Sibyl', zh: '德尔斐女先知' },
  { museum: 'vatican', name: 'The Cumaean Sibyl', zh: '库米女先知' },
  { museum: 'vatican', name: 'The Prophet Jeremiah (Sistine)', zh: '耶利米先知（西斯廷）' },

  // 奥地利（+7）
  { museum: 'khm', name: 'Adam and Eve (Cranach)', zh: '亚当与夏娃（克拉纳赫）' },
  { museum: 'khm', name: 'Spring (Arcimboldo)', zh: '春（阿尔钦博托）' },
  { museum: 'khm', name: 'Netherlandish Proverbs (Bruegel)', zh: '尼德兰谚语（勃鲁盖尔）' },
  { museum: 'khm', name: 'Susanna and the Elders (Tintoretto)', zh: '苏珊娜与长老（丁托列托）' },
  { museum: 'khm', name: 'The Baptism of Christ (Veronese)', zh: '基督受洗（委罗内塞）' },
  { museum: 'khm', name: 'Saint Sebastian (Rubens)', zh: '圣塞巴斯蒂安（鲁本斯）' },
  { museum: 'khm', name: 'The Gluttony of Avarice (Bruegel)', zh: '贪婪（勃鲁盖尔）' },

  // 中国台湾（+10）
  { museum: 'npm-taipei', name: 'Poems on the Tiao Creek (Mi Fu)', zh: '苕溪诗帖' },
  { museum: 'npm-taipei', name: 'Seeking Tao in Autumn Mountains (Juran)', zh: '秋山问道图' },
  { museum: 'npm-taipei', name: 'Early Snow on the River (Zhao Gan)', zh: '江行初雪图' },
  { museum: 'npm-taipei', name: 'Travelers in Mountains (Guan Tong)', zh: '关山行旅图' },
  { museum: 'npm-taipei', name: 'Emperor Minghuang\u2019s Journey to Shu', zh: '明皇幸蜀图' },
  { museum: 'npm-taipei', name: 'Spring Dawn in the Han Palace', zh: '汉宫春晓图' },
  { museum: 'npm-taipei', name: 'The Night Revels of Han Xizai (Taipei)', zh: '韩熙载夜宴图（台北）' },
  { museum: 'npm-taipei', name: 'Dongtian Hall in the Mountains (Dong Yuan)', zh: '洞天山堂图' },
  { museum: 'npm-taipei', name: 'Pine Road on a Mountain Path (Tang Yin)', zh: '山路松声图' },
  { museum: 'npm-taipei', name: 'Album of Twelve Landscape Scenes (Shen Zhou)', zh: '十二景册页（沈周）' },

  // 韩国（+12）
  { museum: 'korea-national', name: 'Earthenware jar with clay figurines', zh: '土偶装饰长颈壶', ko: '토우장식장경호' },
  { museum: 'korea-national', name: 'Bronze bottle with silver inlay', zh: '青铜银入丝葡水禽纹净瓶', ko: '청동은입사포류수금문정병' },
  { museum: 'korea-national', name: 'Gilt-bronze lion incense burner', zh: '金铜狮子香炉', ko: '금동제사자향로' },
  { museum: 'korea-national', name: 'Stone triad standing Buddha', zh: '石造三尊佛立像', ko: '석조삼존불입상' },
  { museum: 'korea-national', name: 'Celadon bottle with incised scroll', zh: '青瓷阳刻莲唐草纹瓶', ko: '청자양각연당초문병' },
  { museum: 'korea-national', name: 'Silla gold headdress ornament', zh: '新罗金制冠饰', ko: '신라금제관식' },
  { museum: 'korea-national', name: 'Baekje gilt-bronze mandorla', zh: '百济金铜光背', ko: '백제금동광배' },
  { museum: 'korea-national', name: 'Wooden Amitabha Buddha statue', zh: '木造阿弥陀如来坐像', ko: '목조아미타여래좌상' },
  { museum: 'korea-national', name: 'Vajrapani guardian statues', zh: '金刚力士像', ko: '금강역사상' },
  { museum: 'korea-national', name: 'Bronze gong (Geumgo)', zh: '青铜金鼓', ko: '청동금고' },
  { museum: 'korea-national', name: 'Celadon incense burner with lion lid', zh: '青瓷狮子盖香炉', ko: '청자 사자향로' },
  { museum: 'korea-national', name: 'Stone lantern model (Silla)', zh: '新罗石灯', ko: '신라 석등' },

  // ══════════════ V1.2d 精准补量（Wikidata 馆藏实测，qid 直配） ══════════════

  // 梵蒂冈（+6）
  { museum: 'vatican', qid: 'Q11719033', name: 'Jan Sobieski at Vienna', zh: '维也纳的扬·索别斯基' },
  { museum: 'vatican', qid: 'Q12875810', name: 'Zeus of Otricoli', zh: '奥特里科利的宙斯' },
  { museum: 'vatican', qid: 'Q16933120', name: 'Meleager of Skopas', zh: '梅利埃格（斯科帕斯）' },
  { museum: 'vatican', qid: 'Q26221218', name: 'Piet\u00e0 (Michelangelo)', zh: '圣殇（米开朗基罗）' },
  { museum: 'vatican', qid: 'Q5148457', name: 'Corona Venus', zh: '科罗纳的维纳斯' },
  { museum: 'vatican', qid: 'Q64351452', name: 'Cleopatra VII statue', zh: '克利奥帕特拉七世雕像' },

  // 韩国（+8，馆藏 P195 实测）
  { museum: 'korea-national', qid: 'Q12583851', name: 'Gilt-bronze Buddha from Guhwang-dong', zh: '金铜如来立像（皇龙寺）', ko: '경주 구황동 금제여래좌상' },
  { museum: 'korea-national', qid: 'Q12583858', name: 'Gold necklace from Noseo-dong', zh: '新罗金项链（诺瑟洞）', ko: '경주 노서동 금목걸이' },
  { museum: 'korea-national', qid: 'Q12586444', name: 'Gold crown from Geumnyeongchong', zh: '金铃冢金冠', ko: '금령총 금관' },
  { museum: 'korea-national', qid: 'Q12588609', name: 'Sehando (Winter Scene) by Kim Jeonghui', zh: '岁寒图（金正喜）', ko: '김정희필 세한도' },
  { museum: 'korea-national', qid: 'Q12615728', name: 'Inwang Jesaekdo', zh: '仁王霁色图', ko: '인왕제색도' },
  { museum: 'korea-national', qid: 'Q16092969', name: 'Gilt-bronze crown ornament of Queen Muryeong', zh: '武宁王妃金制冠饰', ko: '무령왕비 금제관식' },
  { museum: 'korea-national', qid: 'Q16092399', name: 'Bronze censer with beast mask', zh: '兽面纹青铜炉', ko: '귀면 청동로' },
  { museum: 'korea-national', qid: 'Q19162359', name: 'Gold necklace from Hwangnamdaechong', zh: '皇南大冢南坟金项链', ko: '황남대총 남분 금목걸이' },
];
