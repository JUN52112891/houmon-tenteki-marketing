import React, { useState } from 'react'
import { 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Check, 
  ChevronDown, 
  User, 
  Shield, 
  Activity, 
  X, 
  Send,
  Menu,
  Sparkles,
  MessageCircle,
  Calendar,
  ArrowRight,
  MapPin,
  Play,
  Stethoscope
} from 'lucide-react'
import staminaImg from './assets/images/体力の変化を感じる.png'
import workImg from './assets/images/仕事のパフォーマンスを上げたい.png'
import golfImg from './assets/images/ゴルフを楽しみたい.png'
import skinImg from './assets/images/肌のくすみが気になる.png'
import doctorPhoto from './assets/images/宣材写真5.jpg'
import scenePhoto from './assets/images/3人の点滴風景.png'

interface FAQItem {
  question: string
  answer: string
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  // Estimator calculator states
  const [estimateRegion, setEstimateRegion] = useState<number>(0)
  const [estimateDripType, setEstimateDripType] = useState<string>('recovery')
  const [estimateOptions, setEstimateOptions] = useState<boolean>(false)

  // Interactive booking / contact question state
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const regionFees = [
    { name: '中央区 (Chuo-ku)', fee: 0, desc: '基本エリア・出張費無料' },
    { name: '港区 (Minato-ku)', fee: 0, desc: '基本エリア・出張費無料' },
    { name: '千代田区 / 渋谷区 / 新宿区', fee: 3000, desc: '準主要エリア・出張費 ¥3,000' },
    { name: 'その他 東京23区内', fee: 5000, desc: '周辺エリア・出張費一律 ¥5,000' }
  ]

  const dripPrices: Record<string, { name: string, price: number }> = {
    recovery: { name: 'プレミアムリカバリー点滴 (初回体験)', price: 22000 },
    nmn: { name: 'NMNリバース点滴 (エイジングケア)', price: 45000 },
    stemcell: { name: '幹細胞上清液点滴 (最高峰ケア)', price: 55000 }
  }

  const basePrice = dripPrices[estimateDripType]?.price || 22000
  const regionFee = regionFees[estimateRegion]?.fee || 0
  const optionFee = estimateOptions ? 3000 : 0
  const calculatedTotal = basePrice + regionFee + optionFee

  const faqs: FAQItem[] = [
    {
      question: "自宅に特別な準備は必要ですか？",
      answer: "特別な設備やベッドなどのご用意は一切不要です。お身体をゆったりと預けられるソファ、またはベッドや椅子と、点滴器具を置くための小さなスペース（テーブルやサイドボード等）があれば、どのようなお部屋でも施術可能です。"
    },
    {
      question: "初回の所要時間はどのくらいですか？",
      answer: "初回の訪問時には、医師による丁寧な対面診察・事前カウンセリング（15〜20分程度）を実施いたします。点滴自体は、メニューにより30分〜45分程度お時間をいただきますので、全体で約50分〜60分程度を想定しております。"
    },
    {
      question: "妊娠中や授乳中も点滴を受けることはできますか？",
      answer: "はい、一部の栄養補給を目的としたマイルドなビタミン・ミネラル処方であればお受けいただけます。ただし、使用可能な成分や適応については、往診時に医師が母体の健康状態や週数、アレルギー歴を厳重に診察したうえで最終決定いたします。"
    },
    {
      question: "どの点滴メニューを選べばいいか分かりません。",
      answer: "当院では、最初の施術として「プレミアムリカバリー点滴」を推奨しております。これは疲労物質の除去、強力な抗酸化を促すことで、その後の点滴成分の細胞吸収を最も高める土台づくりになるためです。もちろん当日、医師が身体やお肌のお悩みをヒアリングし最適なメニューをご提案します。"
    },
    {
      question: "持病や日常的に内服している薬があっても大丈夫ですか？",
      answer: "ご予約の際、事前に既往歴や現在服用中のお薬についてお伺いします。抗凝固療法を受けている方や重篤な心不全・腎不全等がある場合は、一部メニューがお受けできない場合がございます。安全第一で対応いたしますので、事前問診時に詳細をお伝えください。"
    },
    {
      question: "支払方法には何がありますか？",
      answer: "当日のご訪問時に、現金、主要クレジットカード（VISA / Mastercard / JCB / AMEX / Diners）、各種電子決済（交通系IC / LINE Pay / Apple Pay）などに対応しております。事前支払いや振込対応をご希望の場合は別途LINE窓口までお問い合わせください。"
    }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !contactPhone) {
      alert("お名前と電話番号を入力してください。")
      return
    }
    setContactSubmitted(true)
  }

  const applyPresetQuestion = (preset: string) => {
    setContactMessage(`【質問の選択】: 「${preset}」について詳しく知りたいです。\n現在の体調やご要望など：`)
    const formEl = document.getElementById('contact-form')
    formEl?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#221D18] font-sans antialiased selection:bg-[#143836] selection:text-white pb-20 md:pb-0">
      
      {/* ===================================================
          Header & Navigation (Oligio-Kiss Style)
          =================================================== */}
      <header className="site-header">
        <div className="max-w-[1160px] mx-auto px-6 h-[76px] flex items-center justify-between">
          
          {/* Logo */}
          <div className="logo-wrap">
            <span className="logo-title">LIF SKIN CLINIC</span>
            <span className="logo-sub">VISIT DRIP / 訪問点滴</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#about" className="header-link">点滴の意義</a>
            <a href="#service" className="header-link">訪問という形</a>
            <a href="#menu-detail" className="header-link">厳選メニュー</a>
            <a href="#trial" className="header-link">初回体験プラン</a>
            <a href="#doctor" className="header-link">医師紹介</a>
            <a href="#safety" className="header-link">安全性</a>
            <a href="#flow" className="header-link">ご利用の流れ</a>
            <a href="#faq" className="header-link">Q&A</a>
          </nav>

          {/* Header CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-header-line"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755]" />
              <span>LINE相談</span>
            </a>
            <a 
              href="#contact-form" 
              className="btn-header-reserve"
            >
              <Calendar className="w-4 h-4 text-[#7A5723]" />
              <span>WEB予約</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#53483E] hover:text-[#16120F] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E2D7CA] p-6 space-y-4 shadow-xl">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">点滴の意義</a>
            <a href="#service" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">訪問という新しい形</a>
            <a href="#menu-detail" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">3大点滴メニュー</a>
            <a href="#trial" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">初回体験プラン</a>
            <a href="#doctor" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">医師紹介</a>
            <a href="#safety" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">安心への配慮</a>
            <a href="#flow" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">ご利用の流れ</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">よくある質問</a>
            <div className="pt-3 flex gap-3">
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="btn-header-line flex-1 text-center justify-center">
                LINE相談
              </a>
              <a href="#contact-form" onClick={() => setIsMobileMenuOpen(false)} className="btn-header-reserve flex-1 text-center justify-center">
                予約フォーム
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Warning Regulatory Strip */}
      <div className="bg-[#F3ECE4] text-[#53483E] py-2.5 px-4 text-center text-xs tracking-wider border-b border-[#E2D7CA] leading-relaxed">
        <span className="inline-block"><span className="text-[#9E7D52] font-bold mr-1.5">【自由診療に関するご案内】</span>当院の訪問点滴治療は、</span>
        <span className="inline-block">公的医療保険が適用されない自由診療です。</span>
        <span className="inline-block">医師（麻酔科専門医）が直接訪問・対面診察の上、</span>
        <span className="inline-block">安全に施術を行います。</span>
      </div>

      {/* ===================================================
          01 | HERO SECTION (First View)
          =================================================== */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:py-14 lg:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        {/* Ambient background image: 施術風景 (ほんの少しだけ薄く調整) */}
        <div className="absolute top-0 left-0 right-0 h-[560px] sm:h-[640px] lg:h-full pointer-events-none z-0 overflow-hidden">
          <img 
            src={scenePhoto} 
            alt="リラックスできるプライベート空間での訪問点滴風景"
            className="w-full h-full object-cover object-[center_20%] lg:object-right opacity-55 sm:opacity-45 lg:opacity-28 filter contrast-[1.04]"
          />
          {/* レスポンシブオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/60 to-[#FAF8F5] lg:bg-gradient-to-r lg:from-[#FAF8F5] lg:via-[#FAF8F5]/92 lg:to-[#FAF8F5]/35" />
        </div>

        <div className="relative z-10 max-w-[1160px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            {/* Exclusive Area Capsule Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143836] text-[#FAF8F5] shadow-sm border border-[#143836]/30">
              <MapPin className="w-3.5 h-3.5 text-[#DFCBA9] shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.08em] text-[#FAF8F5]">
                <span className="inline-block">中央区・港区限定の</span>
                <span className="inline-block">プレミアム訪問点滴</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[46px] text-[#16120F] leading-[1.35] tracking-[0.02em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              <span className="inline-block">いつもの自宅が、</span>
              <br className="hidden sm:inline" />
              <span className="inline-block text-[#143836]">最上級のウェルネス空間に。</span>
            </h1>

            <p className="text-[#8E6D42] font-semibold text-sm sm:text-base tracking-[0.08em] font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              <span className="inline-block">麻酔科医としての約10年の経験</span> <span className="inline-block">/ 完全予約制</span>
            </p>

            <p className="text-[#3D332B] text-base leading-relaxed max-w-xl font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
              <span className="inline-block">時間的な制約や</span>
              <span className="inline-block">クリニックへの通院に煩わされることなく、</span>
              <span className="inline-block">ご自宅やプライベートオフィスで</span>
              <span className="inline-block">医療グレードの全身コンディショニングと</span>
              <span className="inline-block">最先端エイジングケアをお受けいただけます。</span>
            </p>

            {/* Price Pill (Oligio-Kiss Style - スマホ版で補足テキストを下段に配置) */}
            <div className="hero-price-pill !border-l-[#143836] !flex-col sm:!flex-row !items-start sm:!items-center !gap-1 sm:!gap-3.5 !py-3 !px-4 sm:!py-3 sm:!px-5.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-xs font-bold text-[#143836] tracking-wider inline-block">初回体験プラン</span>
                <span className="font-serif text-2xl font-bold text-[#16120F] inline-block">¥22,000</span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#827467] inline-block">（税込・往診料・診察代すべて込）</span>
            </div>

            {/* Buttons Group with Frost Glass & Shimmer */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn--line btn--shimmer text-[13.5px] sm:text-base px-4 py-3.5 sm:px-8 sm:py-4 whitespace-nowrap gap-2 sm:gap-2.5"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#06C755] shrink-0" />
                <span className="inline-block">初回体験をLINEで予約する</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 shrink-0" />
              </a>
              <a 
                href="#menu-detail" 
                className="btn btn--gold btn--shimmer text-[13.5px] sm:text-base px-4 py-3.5 sm:px-8 sm:py-4 whitespace-nowrap gap-2 sm:gap-2.5"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A5723] shrink-0" />
                <span className="inline-block">提供メニューを見る</span>
              </a>
            </div>

            {/* Feature Bullets */}
            <div className="pt-6 border-t border-[#E2D7CA] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#53483E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9E7D52] shrink-0" />
                <span className="inline-block">医師（麻酔科医）直接往診</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E7D52] shrink-0" />
                <span className="inline-block">完全個室・移動待ち時間ゼロ</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#9E7D52] shrink-0" />
                <span className="inline-block">明朗会計・追加費用なし</span>
              </div>
            </div>
          </div>

          {/* Right Column: Estimator Card */}
          <div className="lg:col-span-5 bg-white border border-[#E2D7CA] p-5 sm:p-7 rounded-[12px] shadow-[0_12px_36px_rgba(22,18,15,0.06)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2D7CA] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#16120F] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D52]"></span>
                <span className="inline-block">料金シミュレーター</span>
              </h3>
              <span className="text-[11px] font-bold text-[#9E7D52] tracking-wider uppercase">SIMULATOR</span>
            </div>

            <p className="text-xs text-[#827467] leading-relaxed">
              <span className="inline-block">ご希望の訪問地域と点滴メニューを選ぶと、</span>
              <span className="inline-block">往診料を含むお支払総額が</span>
              <span className="inline-block">即座に算出されます。</span>
            </p>

            <div className="space-y-3.5 pt-1">
              <div>
                <label className="block text-[11px] font-bold tracking-widest text-[#53483E] mb-1.5 uppercase">
                  1. 訪問地域（出張費）
                </label>
                <select 
                  value={estimateRegion} 
                  onChange={(e) => setEstimateRegion(Number(e.target.value))}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] p-2.5 text-[#16120F] focus:outline-none focus:border-[#9E7D52]"
                >
                  {regionFees.map((r, i) => (
                    <option key={i} value={i}>{r.name} ({r.fee === 0 ? "出張費無料" : `+¥${r.fee.toLocaleString()}`})</option>
                  ))}
                </select>
                <p className="text-[10px] text-[#827467] mt-1 pl-1">※ {regionFees[estimateRegion].desc}</p>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-widest text-[#53483E] mb-1.5 uppercase">
                  2. 点滴メニュー
                </label>
                <select 
                  value={estimateDripType} 
                  onChange={(e) => setEstimateDripType(e.target.value)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] p-2.5 text-[#16120F] focus:outline-none focus:border-[#9E7D52]"
                >
                  <option value="recovery">プレミアムリカバリー点滴 (初回体験: ¥22,000)</option>
                  <option value="nmn">NMNリバース点滴 (エイジングケア: ¥45,000)</option>
                  <option value="stemcell">幹細胞上清液点滴 (プレミアムケア: ¥55,000)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="calcOptions" 
                  checked={estimateOptions}
                  onChange={(e) => setEstimateOptions(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E2D7CA] text-[#9E7D52] focus:ring-[#9E7D52]"
                />
                <label htmlFor="calcOptions" className="text-xs font-medium text-[#53483E] cursor-pointer select-none">
                  ビタミンブースター追加オプション (+¥3,000)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2D7CA] flex items-center justify-between gap-3">
              <div className="min-w-0 shrink">
                <span className="block text-[10px] text-[#827467] tracking-wider whitespace-nowrap">往診料・税込・診察代込</span>
                <span className="font-serif text-2xl font-bold text-[#16120F] leading-tight block">¥{calculatedTotal.toLocaleString()}</span>
              </div>
              <a 
                href="#contact-form" 
                className="btn btn--gold btn--shimmer text-xs !py-2.5 !px-3.5 sm:!px-5 rounded-[6px] whitespace-nowrap shrink-0"
              >
                この内容で予約
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          02 | CONCERN SECTION (こんなお悩みはありませんか？)
          =================================================== */}
      <section id="about" className="pt-12 pb-16 sm:py-20 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              01 CONCERNS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">こんなお悩みは</span>
              <span className="inline-block">ありませんか？</span>
            </h2>
          </div>

          {/* Large Concern Cards: 2 Columns for Maximum Visual Impact & Readability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1040px] mx-auto">
            
            {/* Concern Card 1 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] shadow-[0_6px_20px_rgba(22,18,15,0.05)] hover:shadow-[0_16px_36px_rgba(22,18,15,0.1)] hover:border-[#143836]/40 transition-all overflow-hidden group">
              <div className="relative aspect-[1540/1021] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={staminaImg} 
                  alt="年齢とともに体力や回復力の変化を感じている" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#143836] border border-[#E2D7CA] font-serif text-xs font-bold px-3 py-1 rounded-[6px] shadow-sm">
                  CONCERN 01
                </span>
              </div>
            </div>

            {/* Concern Card 2 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] shadow-[0_6px_20px_rgba(22,18,15,0.05)] hover:shadow-[0_16px_36px_rgba(22,18,15,0.1)] hover:border-[#143836]/40 transition-all overflow-hidden group">
              <div className="relative aspect-[1540/1021] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={workImg} 
                  alt="忙しくても仕事のパフォーマンスを維持したい" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#143836] border border-[#E2D7CA] font-serif text-xs font-bold px-3 py-1 rounded-[6px] shadow-sm">
                  CONCERN 02
                </span>
              </div>
            </div>

            {/* Concern Card 3 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] shadow-[0_6px_20px_rgba(22,18,15,0.05)] hover:shadow-[0_16px_36px_rgba(22,18,15,0.1)] hover:border-[#143836]/40 transition-all overflow-hidden group">
              <div className="relative aspect-[1540/1021] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={golfImg} 
                  alt="ゴルフや旅行、イベントを元気に楽しみたい" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#143836] border border-[#E2D7CA] font-serif text-xs font-bold px-3 py-1 rounded-[6px] shadow-sm">
                  CONCERN 03
                </span>
              </div>
            </div>

            {/* Concern Card 4 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] shadow-[0_6px_20px_rgba(22,18,15,0.05)] hover:shadow-[0_16px_36px_rgba(22,18,15,0.1)] hover:border-[#143836]/40 transition-all overflow-hidden group">
              <div className="relative aspect-[1540/1021] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={skinImg} 
                  alt="肌のくすみや透明感の低下が気になる" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#143836] border border-[#E2D7CA] font-serif text-xs font-bold px-3 py-1 rounded-[6px] shadow-sm">
                  CONCERN 04
                </span>
              </div>
            </div>

          </div>

          {/* Editorial Transition Bridge */}
          <div className="mt-14 sm:mt-16 text-center max-w-3xl mx-auto px-4">
            {/* Core statement */}
            <h3 className="font-serif text-xl sm:text-3xl text-[#16120F] font-bold leading-[1.65] sm:leading-[1.75] tracking-[0.02em]">
              <span className="inline-block">そのお悩み、</span>
              <span className="inline-block">加齢や過密スケジュールによる</span>
              <br className="hidden sm:inline" />
              <span className="inline-block text-[#143836]">「栄養素の吸収効率低下」</span>
              <span className="inline-block px-1">や</span>
              <span className="inline-block text-[#143836]">「酸化ストレス」</span>
              <span className="inline-block">が原因かもしれません。</span>
            </h3>
          </div>

        </div>
      </section>

      {/* ===================================================
          03 | WHY IV DRIP? (点滴という選択肢)
          =================================================== */}
      <section className="pt-12 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
                  02 WHY IV DRIP?
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#16120F] leading-snug">
                  <span className="inline-block">そのお悩みに、</span>
                  <span className="inline-block text-[#143836]">点滴という選択肢を。</span>
                </h2>
              </div>

              <div className="space-y-3 pt-1">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#16120F] flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#143836] rounded-full inline-block shrink-0" />
                  <span>なぜ、今「点滴ケア」なのか？</span>
                </h3>
                <p className="text-[#53483E] text-base leading-relaxed">
                  <span className="inline-block">点滴は、身体に必要な美容・健康成分を</span>
                  <span className="inline-block">静脈から直接体内（血管）へと届ける方法です。</span>
                  <br className="hidden sm:inline" />
                  <span className="inline-block">サプリメントを経口摂取するのに比べ、</span>
                  <span className="inline-block">消化管を経由しないため、</span>
                  <span className="inline-block">胃腸のコンディションに左右されることなく、</span>
                  <span className="inline-block">その有効成分を瞬時に</span>
                  <span className="inline-block">全身の細胞へと送り届けることができます。</span>
                </p>
              </div>

              <div className="p-5 bg-[#FAF8F5] border-l-4 border-[#143836] rounded-r-[6px] text-xs sm:text-sm text-[#53483E] leading-relaxed">
                <span className="inline-block font-bold text-[#143836]">「疲れた身体に、必要なエネルギーがじわじわ染みわたる感覚。」</span>
                <br className="hidden sm:inline" />
                <span className="inline-block">忙しい現代社会を生き抜くエグゼクティブや</span>
                <span className="inline-block">美意識の高い方々の間で、</span>
                <span className="inline-block">定番のコンディショニングツールとして選ばれています。</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-[#FAF8F5] rounded-[12px] overflow-hidden border border-[#E2D7CA] shadow-[0_12px_36px_rgba(22,18,15,0.08)]">
                <img 
                  src="/src/assets/images/iv_drip_bottle_1790513064457.jpg" 
                  alt="Medical drip bottle preparation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-16 border-t border-[#E2D7CA]">
            <div className="bg-[#FAF8F5] p-7 rounded-[12px] border border-[#E2D7CA] space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#16120F] flex items-center gap-2">
                <span className="w-2 h-6 bg-[#143836] rounded-full shrink-0"></span>
                <span className="inline-block">サプリメントとの決定的な違い</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                <span className="inline-block">口から摂取したサプリメントや食事の成分は、</span>
                <span className="inline-block">胃や腸で消化・分解、吸収されたのち、</span>
                <span className="inline-block">肝臓での代謝プロセスを経て全身に運ばれます。</span>
                <span className="inline-block">そのため、実質的に血管内に届く割合は</span>
                <span className="inline-block">ごく一部にとどまります。</span>
                <span className="inline-block">一方、点滴は消化管を100％バイパスして</span>
                <span className="inline-block">直接静脈から投与するため、</span>
                <span className="inline-block">投与された成分のすべてを</span>
                <span className="inline-block">ロスなく身体中で吸収・利用できます。</span>
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-7 rounded-[12px] border border-[#E2D7CA] space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#16120F] flex items-center gap-2">
                <span className="w-2 h-6 bg-[#143836] rounded-full shrink-0"></span>
                <span className="inline-block">点滴だからこそ叶えられる高濃度チャージ</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                <span className="inline-block">ビタミンC、グルタチオン、NMNといった</span>
                <span className="inline-block">最高水準の有効成分を、</span>
                <span className="inline-block">経口摂取では到底不可能な</span>
                <span className="inline-block">「極めて高い血中濃度」まで</span>
                <span className="inline-block">一気に引き上げることが可能です。</span>
                <span className="inline-block">これこそが、点滴直後から肌のハリ、</span>
                <span className="inline-block">全身のエネルギー代謝、</span>
                <span className="inline-block">慢性的なだるさの劇的な軽減を</span>
                <span className="inline-block">体感いただける最大の理由です。</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          04 | THE CLINIC VISITING DILEMMA (通院の負担)
          =================================================== */}
      <section className="pt-12 pb-14 sm:py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA] relative">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              03 BURDEN OF CLINIC VISITS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">点滴は受けたい。</span>
              <br className="sm:hidden" />
              <span className="inline-block text-[#827467] font-medium sm:ml-2">でも、通院は負担。</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
              <span className="inline-block">点滴のメリットは分かっていても、次のような「時間」と「手間」が疑問になっていませんか？</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dilemma Card 1 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-6 sm:p-8 space-y-3.5 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E2D7CA] flex items-center justify-center text-[#16120F] mx-auto">
                <Clock className="w-5 h-5 text-[#8E6D42]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                <span className="inline-block">移動時間・待ち時間の</span>
                <span className="inline-block">タイムロス</span>
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed text-left sm:text-center">
                <span className="inline-block">「しっかり休みたいはずなのに、</span>
                <span className="inline-block">往復の移動や、クリニックの</span>
                <span className="inline-block">待ち時間で半日潰れてしまった」</span>
                <span className="inline-block">という経験はありませんか？</span>
              </p>
            </div>

            {/* Dilemma Card 2 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-6 sm:p-8 space-y-3.5 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E2D7CA] flex items-center justify-center text-[#16120F] mx-auto">
                <User className="w-5 h-5 text-[#8E6D42]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                <span className="inline-block">身支度の煩わしさ</span>
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed text-left sm:text-center">
                <span className="inline-block">休日はわざわざメイクや外出の準備をせず、</span>
                <span className="inline-block">リラックスした部屋着で過ごしたい</span>
              </p>
            </div>

            {/* Dilemma Card 3 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-6 sm:p-8 space-y-3.5 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E2D7CA] flex items-center justify-center text-[#16120F] mx-auto">
                <Shield className="w-5 h-5 text-[#8E6D42]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                <span className="inline-block">プライバシーの確保</span>
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed text-left sm:text-center">
                <span className="inline-block">美容クリニックの待合室に通っている姿を、</span>
                <span className="inline-block">知り合いや他の患者に見られたくない</span>
              </p>
            </div>
          </div>

          {/* Dilemma Conclusion Callout */}
          <div className="mt-10 sm:mt-12 text-center max-w-2xl mx-auto p-6 sm:p-8 bg-white/95 rounded-[12px] border border-[#E2D7CA] shadow-sm">
            <p className="font-serif text-sm sm:text-base text-[#16120F] leading-relaxed">
              <span className="inline-block">多忙を極める方にとって、</span>
              <span className="inline-block">定期的にクリニックへ足を運ぶこと自体が、</span>
              <br className="hidden sm:inline" />
              <span className="inline-block text-[#8E6D42] font-bold">ひとつの高いハードル（ストレス）になっているのが現状です。</span>
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================
          05 | THE NEW LUXURY FORM (訪問点滴という新しい形)
          =================================================== */}
      <section id="service" className="pt-12 pb-16 sm:py-20 lg:py-28 bg-[#F3ECE4] border-b border-[#E2D7CA] relative">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              04 A NEW STANDARD
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">そんなあなたに、</span>
              <br className="sm:hidden" />
              <span className="inline-block text-[#143836]">訪問点滴という新しい形。</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm mt-4 leading-relaxed">
              <span className="inline-block">クリニックに通って治療を待つのではなく、医療があなたの空間へ出向く。</span>
              <br className="hidden sm:inline" />
              <span className="inline-block">医師・医療スタッフがお客様のご指定場所に直接お伺いして施術する</span>
              <span className="inline-block">「完全予約・プライベート型訪問医療サービス」です。</span>
            </p>
          </div>

          {/* 対比マトリックス（従来の通院 vs LIF SKIN CLINIC の訪問点滴） */}
          <div className="bg-white rounded-[12px] border border-[#E2D7CA] overflow-hidden shadow-sm mb-14">
            <div className="grid grid-cols-12 bg-[#FAF8F5] border-b border-[#E2D7CA] text-xs font-serif font-bold text-[#16120F] py-3.5 px-4 sm:px-6">
              <div className="col-span-3 sm:col-span-3 text-[#827467]">比較項目</div>
              <div className="col-span-4 sm:col-span-4 text-[#827467]">従来のクリニック通院</div>
              <div className="col-span-5 sm:col-span-5 text-[#143836] flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#8E6D42]" />
                <span>当院の訪問点滴</span>
              </div>
            </div>

            <div className="divide-y divide-[#E2D7CA] text-xs sm:text-[13px]">
              <div className="grid grid-cols-12 p-4 sm:p-5 items-center">
                <div className="col-span-3 sm:col-span-3 font-bold text-[#16120F]">移動・待ち時間</div>
                <div className="col-span-4 sm:col-span-4 text-[#827467] pr-2">往復1〜2時間＋待合室待機</div>
                <div className="col-span-5 sm:col-span-5 text-[#143836] font-bold">移動・待ち時間「完全ゼロ」</div>
              </div>

              <div className="grid grid-cols-12 p-4 sm:p-5 items-center bg-[#FAF8F5]/40">
                <div className="col-span-3 sm:col-span-3 font-bold text-[#16120F]">プライバシー</div>
                <div className="col-span-4 sm:col-span-4 text-[#827467] pr-2">他の患者と共有・顔合わせ</div>
                <div className="col-span-5 sm:col-span-5 text-[#143836] font-bold">100%完全個室・厳格な守秘</div>
              </div>

              <div className="grid grid-cols-12 p-4 sm:p-5 items-center">
                <div className="col-span-3 sm:col-span-3 font-bold text-[#16120F]">施術中の姿勢</div>
                <div className="col-span-4 sm:col-span-4 text-[#827467] pr-2">院内の点滴チェアで拘束</div>
                <div className="col-span-5 sm:col-span-5 text-[#143836] font-bold">自宅ベッド・ソファで自由</div>
              </div>

              <div className="grid grid-cols-12 p-4 sm:p-5 items-center bg-[#FAF8F5]/40">
                <div className="col-span-3 sm:col-span-3 font-bold text-[#16120F]">医師の対応</div>
                <div className="col-span-4 sm:col-span-4 text-[#827467] pr-2">短時間・慌ただしい診察</div>
                <div className="col-span-5 sm:col-span-5 text-[#143836] font-bold">麻酔科医がマンツーマン訪問</div>
              </div>
            </div>
          </div>

          {/* 3 Great Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Benefit Card 1 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-7 space-y-3 shadow-sm hover:shadow-[0_12px_36px_rgba(22,18,15,0.06)] hover:border-[#143836]/30 transition-all">
              <div className="w-11 h-11 rounded-full bg-[#143836]/10 border border-[#143836]/25 flex items-center justify-center text-[#143836]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                <span className="inline-block">移動・待ち時間の</span>
                <span className="inline-block">完全ゼロ化</span>
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                <span className="inline-block">移動にかかるストレス、</span>
                <span className="inline-block">クリニックでの診察待ち時間は完全に「ゼロ」。</span>
                <span className="inline-block">お客様は指定の日時にご自宅やオフィスに滞在しているだけで、</span>
                <span className="inline-block">治療の準備が整います。</span>
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-7 space-y-3 shadow-sm hover:shadow-[0_12px_36px_rgba(22,18,15,0.06)] hover:border-[#143836]/30 transition-all">
              <div className="w-11 h-11 rounded-full bg-[#143836]/10 border border-[#143836]/25 flex items-center justify-center text-[#143836]">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                <span className="inline-block">ベッドやソファで</span>
                <span className="inline-block">休んだまま施術</span>
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                <span className="inline-block">外出のための身支度やメイクは一切不要。</span>
                <span className="inline-block">ご自宅のお気に入りのソファやベッドで横になったまま、</span>
                <span className="inline-block">読書や仕事をしながらリラックスしてお過ごしいただけます。</span>
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-7 space-y-3 shadow-sm hover:shadow-[0_12px_36px_rgba(22,18,15,0.06)] hover:border-[#143836]/30 transition-all">
              <div className="w-11 h-11 rounded-full bg-[#143836]/10 border border-[#143836]/25 flex items-center justify-center text-[#143836]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                <span className="inline-block">100%の</span>
                <span className="inline-block">プライバシー保護</span>
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                <span className="inline-block">他人の目、他の患者との接触は一切ありません。</span>
                <span className="inline-block">医療従事者はお客様のためだけに訪問し、</span>
                <span className="inline-block">疑問への相談や細やかなケアを究極のプライベートスペースで行います。</span>
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--gold btn--shimmer text-base"
            >
              <span className="inline-block">訪問可能エリア・空き状況をLINEで確認</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          05 | 3 MAIN DRIP MENUS (厳選3大点滴メニュー)
          =================================================== */}
      <section id="menu-detail" className="pt-12 pb-16 sm:py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              05 DRIP SELECTIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">美容と健康を支える</span>
              <span className="inline-block">3つの厳選点滴</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm mt-3 leading-relaxed">
              <span className="inline-block">エイジング、慢性疲労、美容へのアプローチ。</span>
              <span className="inline-block">お悩みやお身体の状態に合わせ、</span>
              <span className="inline-block">医師の判断のもとで最適に無菌調剤する</span>
              <span className="inline-block">当院おすすめの3大メニューです。</span>
            </p>
          </div>

          {/* Drip 1: Premium Recovery */}
          <div className="bg-white border-2 border-[#143836]/40 rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(22,18,15,0.06)] mb-12">
            <div className="bg-[#FAF8F5] border-b border-[#E2D7CA] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="inline-block bg-[#143836] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    初回体験おすすめ・人気No.1
                  </span>
                  <span className="text-xs font-bold tracking-widest text-[#143836] uppercase">
                    疲労回復・強抗酸化・美白
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F] text-center">
                  <span className="inline-block text-center">プレミアムリカバリー点滴</span> <span className="inline-block text-lg sm:text-xl font-normal text-[#827467]">(Premium Recovery)</span>
                </h3>
                <p className="text-xs text-[#53483E] mt-1.5 leading-relaxed text-center sm:text-left">
                  <span className="inline-block">蓄積された疲労を根こそぎリセットし、</span>
                  <span className="inline-block">本来のベストパフォーマンスを引き出す</span>
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className="text-[11px] font-bold text-[#143836] block uppercase tracking-wider">初回体験特別価格</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#16120F]">¥22,000</span>
                <span className="text-xs text-[#827467] block">（税込・往診料込）</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-[#53483E] text-sm leading-relaxed">
                <span className="inline-block">「十分に寝たはずなのに朝からだるい」</span>
                <span className="inline-block">「頭や身体がすっきり重いまま」といった</span>
                <span className="inline-block">現代人特有の慢性的な疲労に</span>
                <span className="inline-block">アプローチするために設計された、</span>
                <span className="inline-block">当院独自処方のカクテル点滴です。</span>
                <span className="inline-block">高濃度の有効成分が</span>
                <span className="inline-block">ダイレクトに細胞に行きわたり、</span>
                <span className="inline-block">エネルギー産生を急加速させます。</span>
              </p>

              <div>
                <h4 className="text-xs font-bold text-[#143836] uppercase tracking-wider mb-3">
                  【このメニューが選ばれる理由と成分ポイント】
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#53483E]">
                  <div className="p-3 bg-[#FAF8F5] rounded border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">1. グルタチオン (1,200mg配合)</p>
                    <p className="text-[#827467]">肝機能の強力な解毒をサポート。メラニンの発生を強力に抑え美白をもたらします。</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">2. 高濃度ビタミンC / B群カクテル</p>
                    <p className="text-[#827467]">細胞のエネルギー代謝を最大化。強力な抗酸化力で全身の細胞の老化を阻みます。</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">3. チオクト酸（α-リポ酸）</p>
                    <p className="text-[#827467]">糖代謝を急激に促す、最強の抗酸化物質。ダイエット・肌質改善効果をもたらします。</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">4. 強力ネオミノファーゲンシー / マグネシウム</p>
                    <p className="text-[#827467]">肝細胞保護、血管拡張作用により冷え性や筋肉のハリ、だるさを強力に解消します。</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2D7CA]">
                <span className="text-xs text-[#827467]">所要時間：約30〜40分 / 静脈点滴投与</span>
                <button 
                  onClick={() => applyPresetQuestion('プレミアムリカバリー点滴')}
                  className="btn btn--gold btn--shimmer text-xs !py-2.5 !px-4 sm:!px-6 whitespace-nowrap w-full sm:w-auto text-center justify-center"
                >
                  <span className="inline-block">この点滴について</span><span className="inline-block">問い合わせる</span>
                </button>
              </div>
            </div>
          </div>

          {/* Drip 2: NMN */}
          <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(22,18,15,0.06)] mb-12">
            <div className="bg-[#FAF8F5] border-b border-[#E2D7CA] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold tracking-widest text-[#143836] block uppercase mb-1">
                  最先端長寿医療・サーチュイン活性
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F] text-center">
                  <span className="inline-block text-center">NMNリバース点滴</span> <span className="inline-block text-lg sm:text-xl font-normal text-[#827467]">(NMN Reverse Drip)</span>
                </h3>
                <p className="text-xs text-[#53483E] mt-1 leading-relaxed text-center sm:text-left">
                  <span className="inline-block">細胞レベルで若々しさを呼び覚ます、</span>
                  <span className="inline-block">究極のウェルネス・アンチエイジング</span>
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className="text-[10px] text-[#827467] block uppercase">通常料金</span>
                <span className="font-serif text-3xl font-bold text-[#16120F]">¥45,000</span>
                <span className="text-xs text-[#827467] block">（税込・往診料込）</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-[#53483E] text-sm leading-relaxed">
                <span className="inline-block">NMN（ニコチンアミド・モノヌクレオチド）は、</span>
                <span className="inline-block">長寿・若々しさを司る</span>
                <span className="inline-block">「サーチュイン遺伝子（長寿遺伝子）」を活性化させ、</span>
                <span className="inline-block">エネルギーの源であるNAD+を</span>
                <span className="inline-block">細胞内に急速に補う成分です。</span>
                <span className="inline-block">年齢とともに減少していくNMNを</span>
                <span className="inline-block">静脈からダイレクトに投与することで、</span>
                <span className="inline-block">肌の細胞再生を促し、</span>
                <span className="inline-block">全身の若返りをサポートします。</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2D7CA]">
                <span className="text-xs text-[#827467]">所要時間：約45分 / 静脈点滴投与</span>
                <button 
                  onClick={() => applyPresetQuestion('NMNリバース点滴')}
                  className="btn btn--gold btn--shimmer text-xs !py-2.5 !px-4 sm:!px-6 whitespace-nowrap w-full sm:w-auto text-center justify-center"
                >
                  <span className="inline-block">この点滴について</span><span className="inline-block">問い合わせる</span>
                </button>
              </div>
            </div>
          </div>

          {/* Drip 3: Stem Cell */}
          <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(22,18,15,0.06)]">
            <div className="bg-[#FAF8F5] border-b border-[#E2D7CA] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold tracking-widest text-[#143836] block uppercase mb-1">
                  最先端再生医療由来・最高峰エイジングケア
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F] text-center">
                  <span className="inline-block text-center">幹細胞上清液点滴</span> <span className="inline-block text-lg sm:text-xl font-normal text-[#827467]">(Stem Cell Drip)</span>
                </h3>
                <p className="text-xs text-[#53483E] mt-1 leading-relaxed text-center sm:text-left">
                  <span className="inline-block">傷ついた細胞を修復し活性化する、</span>
                  <span className="inline-block">次世代の根本エイジングアプローチ</span>
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className="text-[10px] text-[#827467] block uppercase">通常料金</span>
                <span className="font-serif text-3xl font-bold text-[#16120F]">¥55,000</span>
                <span className="text-xs text-[#827467] block">（税込・往診料込）</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-[#53483E] text-sm leading-relaxed">
                <span className="inline-block">ヒト脂肪由来の幹細胞を培養する過程で、</span>
                <span className="inline-block">細胞を除去したあとに残る高濃度の上澄み液（上清液）を使用した</span>
                <span className="inline-block">究極のエイジングケア点滴です。</span>
                <span className="inline-block">この上清液には、細胞の再生や修復を促す</span>
                <span className="inline-block">数百種類もの「成長因子（サイトカイン）」や、</span>
                <span className="inline-block">情報伝達物質である「エクソソーム」が豊富に含まれており、</span>
                <span className="inline-block">体内の老化した組織そのものを</span>
                <span className="inline-block">内側から活性化へと導きます。</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2D7CA]">
                <span className="text-xs text-[#827467]">所要時間：約30〜45分 / 静脈点滴投与</span>
                <button 
                  onClick={() => applyPresetQuestion('幹細胞上清液点滴')}
                  className="btn btn--gold btn--shimmer text-xs !py-2.5 !px-4 sm:!px-6 whitespace-nowrap w-full sm:w-auto text-center justify-center"
                >
                  <span className="inline-block">この点滴について</span><span className="inline-block">問い合わせる</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          06 | TRIAL PLAN HIGHLIGHT (初回体験プラン)
          =================================================== */}
      <section id="trial" className="pt-12 pb-16 sm:py-20 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              TRIAL OFFER
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug mb-4">
              <span className="inline-block">まずは、</span>
              <span className="inline-block text-[#143836]">訪問点滴をご体験ください。</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              <span className="inline-block">当院の訪問医療サービスを初めてご利用いただく方へ。</span>
              <span className="inline-block">医師自らがお伺いし、</span>
              <span className="inline-block">丁寧なカウンセリングと確かな技術をお届けする</span>
              <span className="inline-block">初回限定の特別体験プランをご用意しました。</span>
            </p>
          </div>

          {/* Ticket Card */}
          <div className="bg-white border-2 border-[#143836]/40 rounded-[16px] p-8 sm:p-12 shadow-[0_12px_36px_rgba(22,18,15,0.08)] relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 bg-[#143836] text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-bl-[8px] uppercase">
              中央区・港区限定
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#16120F] mb-3">
                  <span className="inline-block">初回体験プラン内容</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#53483E]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#143836] shrink-0" />
                    <span className="inline-block">医師による対面問診・カウンセリング</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#143836] shrink-0" />
                    <span className="inline-block">プレミアムリカバリー点滴（約40分）</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#143836] shrink-0" />
                    <span className="inline-block">往診料・材料費・診察代すべて込み</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#143836] shrink-0" />
                    <span className="inline-block">LINEによるアフターケア・美容健康相談</span>
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-[#E2D7CA] pt-6 md:pt-0 md:pl-8">
                <span className="text-xs text-[#827467] block mb-1">初回特別体験価格（税込）</span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#143836]">
                  ¥22,000
                </span>
                <span className="text-[11px] text-[#827467] block mt-1">※これ以上の追加費用は一切かかりません。</span>

                <div className="mt-6">
                  <a 
                    href="https://line.me" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn--line btn--shimmer w-full text-center justify-center text-[13.5px] sm:text-sm !py-3.5 !px-3 sm:!px-6 whitespace-nowrap gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                    <span className="inline-block">初回体験をLINEで予約する</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          08 | CONTINUOUS SUPPORT (継続的に美と健康を整えたい方へ)
          =================================================== */}
      <section className="pt-12 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              CONTINUOUS CARE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">継続的に美と健康を</span>
              <span className="inline-block text-[#143836]">整えたい方へ</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm mt-4 leading-relaxed max-w-xl mx-auto">
              <span className="inline-block">初回体験後、ご希望の方には定期的な継続プランをご用意しています。</span>
              <span className="inline-block">単に点滴を打つだけではなく、</span>
              <span className="inline-block">医師が健康と美容を継続的に見守るサービスです。</span>
            </p>
          </div>

          {/* Connected Step Bar Layout without repetitive box cards */}
          <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E2D7CA]">
              
              {/* Pillar 1 */}
              <div className="pt-6 md:pt-0 md:px-8 first:pt-0 first:pl-0 space-y-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-[#8E6D42]">01</span>
                  <span className="text-[11px] font-bold tracking-wider text-[#143836] uppercase bg-[#143836]/10 px-2.5 py-0.5 rounded-full">
                    Regular Visits
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F]">
                  定期訪問点滴
                </h3>
                <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                  <span className="inline-block">プランに応じて定期的にご自宅へ伺い、</span>
                  <span className="inline-block">診察のうえで点滴を行います。</span>
                  <span className="inline-block">生活リズムを崩さず、確実にコンディションを保ちます。</span>
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="pt-6 md:pt-0 md:px-8 space-y-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-[#8E6D42]">02</span>
                  <span className="text-[11px] font-bold tracking-wider text-[#143836] uppercase bg-[#143836]/10 px-2.5 py-0.5 rounded-full">
                    Doctor Consultation
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F]">
                  美容・健康に関するご相談
                </h3>
                <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                  <span className="inline-block">日頃感じている体調の変化や、</span>
                  <span className="inline-block">美容・健康の疑問についてご相談いただけます。</span>
                  <span className="inline-block">専任医だからこその伴走体制です。</span>
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="pt-6 md:pt-0 md:pl-8 space-y-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-[#8E6D42]">03</span>
                  <span className="text-[11px] font-bold tracking-wider text-[#143836] uppercase bg-[#143836]/10 px-2.5 py-0.5 rounded-full">
                    Blood Screening
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F]">
                  定期血液検査
                </h3>
                <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                  <span className="inline-block">必要に応じて定期的な血液検査を行い、</span>
                  <span className="inline-block">体調の変化を確認します。</span>
                  <span className="inline-block">検査結果に対する適切な医療機関の受診をご案内します。</span>
                </p>
              </div>

            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#827467]">
              ※まずは初回体験で、訪問というサービスがご自身の生活に合うかお確かめください。
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================
          07 | DOCTOR PHILOSOPHY (医師紹介)
          =================================================== */}
      <section id="doctor" className="pt-12 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4">
              <div className="aspect-[3/4] rounded-[12px] overflow-hidden border border-[#E2D7CA] shadow-[0_12px_36px_rgba(22,18,15,0.08)]">
                <img 
                  src={doctorPhoto} 
                  alt="LIF SKIN CLINIC 院長 宇佐美 潤"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-4 border-l-4 border-[#143836] pl-3">
                <span className="text-xs text-[#143836] font-semibold block">LIF SKIN CLINIC 院長</span>
                <h3 className="font-serif text-2xl font-bold text-[#16120F]">宇佐美 潤</h3>
                <span className="text-xs text-[#827467] leading-relaxed block mt-0.5">
                  <span className="inline-block">日本麻酔科学会認定専門医</span> <span className="inline-block">/ 心臓血管麻酔専門医</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
                  DOCTOR PROFILE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-snug">
                  <span className="inline-block">点滴を熟知した麻酔科専門医が、</span>
                  <br className="hidden sm:inline" />
                  <span className="inline-block text-[#143836]">ご自宅までお伺いする理由。</span>
                </h2>
              </div>
              
              <p className="text-[#53483E] text-sm leading-relaxed">
                <span className="inline-block">こんにちは。</span>
                <span className="inline-block">LIF SKIN CLINIC 院長の宇佐美潤です。</span>
                <span className="inline-block">私は大学病院などで約10年間、</span>
                <span className="inline-block">麻酔科医として勤務したのち、</span>
                <span className="inline-block">美容医療の世界へ進みました。</span>
              </p>
              
              <p className="text-[#53483E] text-sm leading-relaxed">
                <span className="inline-block">麻酔科では、日々の手術の中で</span>
                <span className="inline-block">無数の静脈確保や全身の循環管理を行い、</span>
                <span className="inline-block">最善の安全性管理を徹底してまいりました。</span>
                <span className="inline-block">その技術を活かし、現在行っている美容医療でも、</span>
                <span className="inline-block">お客様が不安なく施術を受けられるよう</span>
                <span className="inline-block">細やかな配慮を大切にしています。</span>
              </p>

              <div className="p-5 bg-[#FAF8F5] border-l-4 border-[#143836] rounded-r-[8px] space-y-2 border border-[#E2D7CA]/60">
                <h4 className="font-serif text-sm font-bold text-[#143836] leading-snug">
                  <span className="inline-block">「仕事が忙しくてクリニックへ行く時間がない」</span>
                  <br className="hidden sm:inline" />
                  <span className="inline-block">「移動せず、リラックスしたプライベートな空間で最高峰のケアを受けたい」</span>
                </h4>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  <span className="inline-block">そうしたお声にお応えするために、</span>
                  <span className="inline-block">ご自宅やオフィスで完結する訪問点滴事業をスタートいたしました。</span>
                  <span className="inline-block">点滴を受けることだけでなく、</span>
                  <span className="inline-block">ご自身の美容やお身体のコンディションについて</span>
                  <span className="inline-block">何でもお気軽にご相談ください。</span>
                </p>
              </div>

              <div className="pt-2">
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--gold btn--shimmer text-xs py-3 px-6"
                >
                  <span className="inline-block">LINEで医師に質問・相談する</span>
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          08 | SAFETY MEASURES (安心への配慮)
          =================================================== */}
      <section id="safety" className="pt-12 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              SAFETY & QUALITY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">安心して点滴を</span>
              <span className="inline-block">受けていただくために</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm mt-3 leading-relaxed">
              麻酔科専門医が責任をもって、院内と同等以上の安全基準を徹底します。
            </p>
          </div>

          {/* Clean 2-Column Editorial Grid with Border Dividers instead of floating boxes */}
          <div className="bg-white border border-[#E2D7CA] rounded-[16px] divide-y sm:divide-y-0 sm:grid sm:grid-cols-2 shadow-sm overflow-hidden">
            
            {/* Promise 1 */}
            <div className="p-6 sm:p-8 flex items-start gap-4 sm:border-r sm:border-b border-[#E2D7CA]">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 01</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  医師が問診したうえで実施
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  点滴の前に体調、既往歴、内服薬、アレルギー歴などを確認し、施術の可否を判断します。
                </p>
              </div>
            </div>

            {/* Promise 2 */}
            <div className="p-6 sm:p-8 flex items-start gap-4 sm:border-b border-[#E2D7CA]">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 02</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  点滴中も状態を確認します
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  点滴中は体調の変化がないか確認しながら、安全に配慮して施術を進めます。
                </p>
              </div>
            </div>

            {/* Promise 3 */}
            <div className="p-6 sm:p-8 flex items-start gap-4 sm:border-r border-[#E2D7CA]">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 03</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  体調変化への対応体制
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  アレルギー反応や気分不良などが生じた場合は、医師の判断で必要な初期対応を行います。症状に応じて、救急医療機関との連携や受診のご案内を行います。
                </p>
              </div>
            </div>

            {/* Promise 4 */}
            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 04</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  衛生管理を徹底します
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  点滴に使用する針や医療器材は適切に管理し、衛生面に配慮して施術を行います。
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          09 | PROCESS / FLOW (ご利用の流れ)
          =================================================== */}
      <section id="flow" className="pt-12 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[960px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              HOW TO USE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              ご利用の流れ
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm mt-3 leading-relaxed">
              ご予約から点滴後のアフターケアまで、スムーズかつ快適に完結します。
            </p>
          </div>

          {/* Connected Process Flow Timeline */}
          <div className="relative">
            {/* Desktop connecting horizontal line */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-[#E2D7CA] z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative">
                  <span className="text-[#143836]">01</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F]">
                    LINEからお問い合わせ
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    下記のボタンをタップして、ご希望の日時や気になっていることをお問い合わせいただけます。
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative">
                  <span className="text-[#143836]">02</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F]">
                    事前確認・日程調整
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    ご希望日時、訪問先、体調や既往歴、内服薬などを確認します。
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative">
                  <span className="text-[#143836]">03</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F]">
                    ご自宅へ訪問し診察・点滴
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    点滴を行うための小さなスペースをご用意いただくだけ。特別な準備は必要ありません。
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#143836] text-white flex items-center justify-center font-serif font-bold text-base shadow-md relative">
                  <span>04</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F]">
                    アフターケア
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    施術後の注意事項をご説明します。点滴後に気になることがあればいつでもお問い合わせいただけます。
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--line btn--shimmer inline-flex items-center gap-2 !py-3.5 !px-8 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755]" />
              <span>訪問可能日時を確認する</span>
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          10 | VIDEO EMBED PLACEHOLDER (施術・サービス紹介動画)
          =================================================== */}
      <section className="pt-12 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[960px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              CONCEPT MOVIE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">訪問点滴の様子を</span>
              <span className="inline-block text-[#143836]">動画で見る</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm mt-3 leading-relaxed">
              ご自宅でのリラックスした施術風景や、医師による丁寧な対応を映像でご確認いただけます。
            </p>
          </div>

          {/* Video Player Frame Container */}
          <div className="bg-white border-2 border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-lg p-2 sm:p-4">
            <div className="relative aspect-video w-full rounded-[10px] overflow-hidden bg-[#16120F] flex items-center justify-center group cursor-pointer">
              {/* Fallback image as background poster */}
              <img 
                src={scenePhoto} 
                alt="訪問点滴施術風景" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

              {/* Play Button Icon */}
              <div className="relative z-10 text-center space-y-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#143836]/90 border-2 border-[#DFCBA9] flex items-center justify-center text-white mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" />
                </div>
                <p className="text-white text-xs sm:text-sm font-serif tracking-wider font-semibold">
                  動画を再生する (Video Placeholder)
                </p>
                <span className="inline-block text-[11px] text-white/70 bg-black/40 px-3 py-1 rounded-full">
                  ※YouTubeやVimeo、MP4動画のURLを埋め込み可能です
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          09 | FAQ (よくあるご質問)
          =================================================== */}
      <section id="faq" className="pt-12 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              FAQ
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">よくあるご質問</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div 
                  key={index}
                  className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[8px] overflow-hidden transition-all shadow-sm"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-semibold text-[#16120F] focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#9E7D52] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        Q
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#827467] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#9E7D52]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#53483E] leading-relaxed border-t border-[#E2D7CA]/40 bg-white">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#FAF8F5] text-[#9E7D52] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          A
                        </span>
                        <div>{faq.answer}</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ===================================================
          11 | VOICES / TESTIMONIALS (ご利用いただいた方の声)
          =================================================== */}
      <section className="pt-12 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              VOICES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">ご利用いただいた方の声</span>
            </h2>
            <p className="text-[#53483E] text-xs sm:text-sm mt-3 leading-relaxed">
              ご自宅で受ける点滴医療の快適さを実感していただいています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-sm relative">
              <span className="font-serif text-4xl text-[#8E6D42]/30 absolute top-4 right-5 leading-none">“</span>
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">
                  IT企業経営者・40代男性
                </span>
                <h3 className="font-serif text-base font-bold text-[#16120F] leading-snug">
                  「点滴後、そのまま休めるのが助かります」
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  仕事が忙しく、点滴を受けるためにクリニックへ行く時間すら惜しかったのですが、自宅なら移動も待ち時間もなく、点滴後にそのまま眠れるので助かっています。
                </p>
              </div>
              <div className="pt-3 border-t border-[#E2D7CA]/70 flex items-center gap-2 text-[11px] text-[#827467]">
                <Check className="w-3.5 h-3.5 text-[#143836]" />
                <span>プレミアムリカバリー点滴利用</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-sm relative">
              <span className="font-serif text-4xl text-[#8E6D42]/30 absolute top-4 right-5 leading-none">“</span>
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">
                  会社役員・30代女性
                </span>
                <h3 className="font-serif text-base font-bold text-[#16120F] leading-snug">
                  「自宅でも安心して受けられました」
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  初めて自宅で点滴を受けることに少し不安もありましたが、先生が体調を確認しながら丁寧に説明してくださり、落ち着いて受けることができました。
                </p>
              </div>
              <div className="pt-3 border-t border-[#E2D7CA]/70 flex items-center gap-2 text-[11px] text-[#827467]">
                <Check className="w-3.5 h-3.5 text-[#143836]" />
                <span>高濃度ビタミンC＋NMN点滴利用</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-sm relative">
              <span className="font-serif text-4xl text-[#8E6D42]/30 absolute top-4 right-5 leading-none">“</span>
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">
                  IT企業役員・50代男性
                </span>
                <h3 className="font-serif text-base font-bold text-[#16120F] leading-snug">
                  「美容と健康について相談できるのが心強いです」
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  点滴だけでなく、普段気になっている体調や美容についても相談できました。自分の状態を継続的に見てもらえる安心感があります。
                </p>
              </div>
              <div className="pt-3 border-t border-[#E2D7CA]/70 flex items-center gap-2 text-[11px] text-[#827467]">
                <Check className="w-3.5 h-3.5 text-[#143836]" />
                <span>幹細胞上清液点滴利用</span>
              </div>
            </div>

          </div>

          <p className="text-[11px] text-center text-[#827467] mt-8">
            ※体験談は個人の感想であり、効果効能を保証するものではありません。
          </p>

        </div>
      </section>

      {/* ===================================================
          12 | SERVICE AREA (対応エリア)
          =================================================== */}
      <section className="py-12 sm:py-16 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block font-serif">
            SERVICE AREA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold">
            対応エリア
          </h2>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2D7CA] rounded-full shadow-sm text-sm sm:text-base font-serif font-bold text-[#143836]">
            <MapPin className="w-4 h-4 text-[#8E6D42]" />
            <span>東京都中央区・港区（完全予約制）</span>
          </div>
          <p className="text-xs text-[#53483E] max-w-lg mx-auto leading-relaxed pt-1">
            対応エリア外でも、場所やスケジュールによってはお伺いできる場合がございます。その他地域についてはLINEよりお気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* ===================================================
          13 | INTERACTIVE QUESTION PRESET & CONTACT FORM
          =================================================== */}
      <section id="contact-form" className="pt-12 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[780px] mx-auto px-6">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-3 font-serif">
              CONTACT & INQUIRY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-snug">
              <span className="inline-block">まずは気軽に</span>
              <span className="inline-block">ご質問ください</span>
            </h2>
            <p className="text-xs text-[#827467] mt-3 leading-relaxed">
              <span className="inline-block">タップすると質問内容が</span>
              <span className="inline-block">自動で入力されます</span>
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-8">
            <button 
              onClick={() => applyPresetQuestion('自分でも受けられますか？')}
              className="px-4 py-2 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-sm"
            >
              「自分でも受けられますか？」
            </button>
            <button 
              onClick={() => applyPresetQuestion('どんな点滴がいいそうですか？')}
              className="px-4 py-2 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-sm"
            >
              「どんな点滴が合いそう？」
            </button>
            <button 
              onClick={() => applyPresetQuestion('希望日に訪問できますか？')}
              className="px-4 py-2 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-sm"
            >
              「希望日に訪問できますか？」
            </button>
          </div>

          {contactSubmitted ? (
            <div className="bg-white border-2 border-[#06C755] rounded-[12px] p-8 text-center space-y-4 shadow-md">
              <div className="w-12 h-12 bg-[#06C755]/10 text-[#06C755] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#16120F]">
                <span className="inline-block">お問い合わせを</span>
                <span className="inline-block">受け付けました</span>
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                <span className="inline-block">内容を確認の上、担当医師・スタッフより</span>
                <span className="inline-block">速やかにご連絡を差し上げます。</span>
                <br className="hidden sm:inline" />
                <span className="inline-block">お急ぎの場合は、公式LINEより直接メッセージをいただければ</span>
                <span className="inline-block">最短即時でお答え可能です。</span>
              </p>
              <div className="pt-2">
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer text-xs py-3 px-6 inline-flex"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755]" />
                  <span>LINEですぐにやり取りする</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="bg-white border border-[#E2D7CA] rounded-[12px] p-6 sm:p-8 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#16120F] mb-1.5">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="例：山田 太郎"
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] focus:outline-none focus:border-[#9E7D52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#16120F] mb-1.5">
                  お電話番号 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="例：090-1234-5678"
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] focus:outline-none focus:border-[#9E7D52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#16120F] mb-1.5">
                  ご相談内容・ご質問
                </label>
                <textarea 
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="ご希望のメニュー、訪問先エリア、ご質問などをご自由にご記入ください。"
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] focus:outline-none focus:border-[#9E7D52]"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="btn btn--gold btn--shimmer w-full text-sm py-3.5"
                >
                  <Send className="w-4 h-4 text-[#7A5723]" />
                  <span>質問・予約希望を送信する</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#827467] leading-relaxed">
                <span className="inline-block">※ご入力いただいた個人情報は、訪問診療のご連絡のみに使用し、</span>
                <span className="inline-block">第三者に提供することはございません。</span>
              </p>
            </form>
          )}

        </div>
      </section>

      {/* ===================================================
          11 | CLINIC & REGULATORY FOOTER
          =================================================== */}
      <footer className="bg-[#16120F] text-[#FAF8F5] py-14 border-t border-white/10">
        <div className="max-w-[1160px] mx-auto px-6 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider block text-white mb-2">
                LIF SKIN CLINIC
              </span>
              <p className="text-xs text-[#DFCBA9] tracking-widest font-semibold mb-4">
                <span className="inline-block">院長 宇佐美 潤</span> <span className="inline-block">（麻酔科専門医）</span>
              </p>
              <p className="text-xs text-white/70 leading-relaxed max-w-md">
                <span className="inline-block">東京都中央区日本橋久松町9-6</span><br />
                <span className="inline-block">※本訪問点滴サービスは、医師による完全予約制の往診診療です。</span>
                <span className="inline-block">事前のご予約・ご相談は公式LINEまたは当サイトより承っております。</span>
              </p>
            </div>

            <div className="space-y-3 text-xs text-white/60">
              <h4 className="font-bold text-white tracking-wider">【自由診療に関する法的掲示】</h4>
              <p className="leading-relaxed">
                ・本治療は公的医療保険が適用されない自由診療です。<br />
                ・点滴による効果・実感には個人差があります。<br />
                ・主な副作用：血管痛、内出血、一時的な頭痛、低血糖症状、アレルギー等。異常を感じた場合は直ちに投与を中止し、適切な処置を行います。
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} LIF SKIN CLINIC. All rights reserved.
          </div>

        </div>
      </footer>

      {/* ===================================================
          12 | MOBILE FIXED BOTTOM CTA (Oligio-Kiss Frost Style)
          =================================================== */}
      <div className="fixed-cta-bar">
        <a 
          href="https://line.me" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="frost-btn frost-btn--line"
        >
          <div className="frost-btn-icon-wrap--line">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <span className="frost-btn-text">LINEで予約相談</span>
        </a>
        <a 
          href="#contact-form" 
          className="frost-btn frost-btn--web"
        >
          <div className="frost-btn-icon-wrap--web">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <span className="frost-btn-text">WEB簡単予約</span>
        </a>
      </div>

    </div>
  )
}
