import React, { useState } from 'react'
import { 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Check, 
  ChevronDown, 
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
  Stethoscope
} from 'lucide-react'
import staminaImg from './assets/images/体力の変化を感じる.png'
import workImg from './assets/images/仕事のパフォーマンスを上げたい.png'
import golfImg from './assets/images/ゴルフを楽しみたい.png'
import skinImg from './assets/images/肌のくすみが気になる.png'
import doctorPhoto from './assets/images/宣材写真5.jpg'
import scenePhoto from './assets/images/3人の点滴風景.png'
import supplementImg from './assets/images/ChatGPT Image 2026年8月30日 21_06_26 (2).png'
import dripBagImg from './assets/images/ChatGPT Image 2026年8月30日 21_06_26 (3).png'
import waitingManImg from './assets/images/時間待ちの男性.png'

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

  // Section 04 interactive comparison mode
  const [compareMode, setCompareMode] = useState<'visit' | 'clinic'>('visit')

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
    nmn: { name: 'NMNリバース点滴 (エイジングケア)', price: 49500 },
    stemcell: { name: '幹細胞上清液点滴 (最高峰ケア)', price: 99000 }
  }

  const basePrice = dripPrices[estimateDripType]?.price || 22000
  const regionFee = regionFees[estimateRegion]?.fee || 0
  const optionFee = estimateOptions ? 3000 : 0
  const calculatedTotal = basePrice + regionFee + optionFee

  const faqs: FAQItem[] = [
    {
      question: "自宅に特別な準備は必要ですか？",
      answer: "特別な設備は必要ありません。点滴を受けられる椅子やソファと、医療器具を置くための小さなスペースがあれば大丈夫です。"
    },
    {
      question: "点滴の所要時間はどのくらいですか？",
      answer: "診察を含め、約60～90分が目安です。点滴内容や当日の体調によって前後する場合があります。"
    },
    {
      question: "家族が一緒にいても大丈夫ですか？",
      answer: "問題ありません。ご家族が同じお部屋にいる状態でも受けていただけます。ご友人と一緒に受けられてもかまいません。"
    },
    {
      question: "どの点滴を選べばよいか分かりません。",
      answer: "初回体験は疲労回復カクテルをご用意しています。ほかの点滴をご希望の場合も、目的に合った点滴をご提案します。"
    },
    {
      question: "持病や内服薬があっても受けられますか？",
      answer: "持病や内服薬の内容によって判断が異なります。事前確認と診察を行い、安全面を考慮して医師が施術の可否を判断します。"
    },
    {
      question: "初回体験後に契約しなければいけませんか？",
      answer: "いいえ。継続プランへの加入は任意です。初回体験のみでもご利用いただけます。"
    },
    {
      question: "支払い方法を教えてください。",
      answer: "現金、クレジットカード、各種電子決済に対応しています。"
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
              時間的な制約やクリニックへの通院に煩わされることなく、ご自宅やプライベートオフィスで医療グレードの全身コンディショニングと最先端エイジングケアをお受けいただけます。
            </p>

            {/* Price Pill (Oligio-Kiss Style - スマホ版で補足テキストを下段に配置) */}
            <div className="hero-price-pill !border-l-[#143836] !flex-col sm:!flex-row !items-start sm:!items-center !gap-1 sm:!gap-3.5 !py-3 !px-4 sm:!py-3 sm:!px-5.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-xs font-bold text-[#143836] tracking-wider inline-block">初回体験プラン</span>
                <span className="font-serif text-2xl font-bold text-[#143836] inline-block">¥22,000</span>
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
              ご希望の訪問地域と点滴メニューを選ぶと、往診料を含むお支払総額が即座に算出されます。
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
                  <option value="nmn">NMNリバース点滴 (エイジングケア: ¥49,500〜)</option>
                  <option value="stemcell">幹細胞上清液点滴 (プレミアムケア: ¥99,000〜)</option>
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
      <section id="about" className="pt-12 pb-16 sm:py-20 bg-[#F3ECE4]/70 border-b border-[#E2D7CA]/60">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-8 text-left sm:text-center flex sm:justify-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                01 CONCERNS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                こんなお悩みはありませんか？
              </h2>
            </div>
          </div>

          {/* Large Concern Cards: 2 Columns for Maximum Visual Impact & Readability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-[1040px] mx-auto">
            
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
          <div className="mt-8 sm:mt-10 text-center max-w-3xl mx-auto px-4">
            {/* Core statement */}
            <h3 className="font-serif text-xl sm:text-3xl text-[#16120F] font-bold leading-[1.65] sm:leading-[1.75] tracking-[0.02em]">
              そのお悩み、加齢や過密スケジュールによる<br className="hidden sm:inline" /><span className="text-[#16120F]">「栄養素の吸収効率低下」</span>や<span className="text-[#16120F]">「酸化ストレス」</span>が原因かもしれません。
            </h3>
          </div>

        </div>
      </section>

      {/* ===================================================
          03 | WHY IV DRIP? (点滴という選択肢)
          =================================================== */}
      <section className="pt-12 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="max-w-3xl mx-auto">
            
            <div className="space-y-6">
              <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5">
                <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                  02 WHY IV DRIP?
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16120F] leading-tight">
                  そのお悩みに、<span className="text-[#16120F]">点滴という選択肢を。</span>
                </h2>
              </div>

              <div className="space-y-3 pt-1">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#16120F] flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-[#8E6D42] rotate-45 inline-block shrink-0 rounded-[1px]" />
                  <span>なぜ、今「点滴ケア」なのか？</span>
                </h3>
                <div className="text-sm sm:text-base text-[#53483E] leading-relaxed space-y-2">
                  <p>
                    点滴は、必要な成分を静脈から直接体内へ届ける方法です。
                  </p>
                  <p>
                    忙しい現代社会を生き抜くエグゼクティブや美意識の高い方々の間で、定番のコンディショニングツールとして選ばれています。
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Comparison Content (Flat Editorial Layout instead of nested boxes/cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-10 pt-0">
            
            {/* Column 1 */}
            <div className="space-y-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px]">
                <img 
                  src={supplementImg} 
                  alt="サプリメントとコップの水" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2.5">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#16120F] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-[#8E6D42] rotate-45 inline-block shrink-0 rounded-[1px]" />
                  <span>サプリメントとの違い</span>
                </h3>
                <div className="text-sm sm:text-base text-[#53483E] leading-relaxed space-y-2">
                  <p>
                    口から摂取した成分は、胃や腸で消化・吸収され、肝臓で代謝される過程を経て体内に取り込まれます。
                  </p>
                  <p>
                    一方、点滴は消化管を介さず、成分を静脈から直接体内へ投与できることが特徴です。
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px]">
                <img 
                  src={dripBagImg} 
                  alt="精密に調剤された点滴バッグ" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2.5">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#16120F] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-[#8E6D42] rotate-45 inline-block shrink-0 rounded-[1px]" />
                  <span>点滴だからできること</span>
                </h3>
                <div className="text-sm sm:text-base text-[#53483E] leading-relaxed space-y-2">
                  <p>
                    ビタミンやミネラルなど、目的に合わせた複数の成分を一度に補うことができます。
                  </p>
                  <p>
                    忙しい日々のコンディションを整えたい方、疲れが抜けにくいと感じる方、肌の調子や透明感が気になる方など、それぞれの目的に応じたケアとしてご利用いただけます。
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          04 | THE CLINIC VISITING DILEMMA (通院の負担)
          =================================================== */}
      <section className="pt-14 pb-14 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA] relative">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto mb-8 sm:mb-12">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                03 BURDEN OF CLINIC VISITS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                点滴は受けたい。<span className="text-[#16120F] font-semibold sm:ml-2">でも、通院は負担。</span>
              </h2>
            </div>
 
            {/* Image of Waiting Man */}
            <div className="max-w-2xl mx-auto mb-8 sm:mb-10 rounded-[16px] overflow-hidden border border-[#E2D7CA]/60 shadow-md">
              <img 
                src={waitingManImg} 
                alt="移動時間・待ち時間のストレスを感じる男性" 
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-[#16120F] text-left sm:text-center">
              <p className="font-serif text-base sm:text-xl lg:text-2xl text-[#4A3525] font-semibold tracking-wide leading-relaxed">
                移動時間・待ち時間のタイムロス、<br className="block sm:hidden" />身支度の煩わしさ、プライバシーの確保・・・。
              </p>
              <p className="font-serif text-base sm:text-xl lg:text-2xl text-[#4A3525] font-semibold tracking-wide leading-relaxed">
                多忙を極める方にとって、定期的にクリニックへ足を運ぶこと自体が、<br className="hidden sm:inline" />
                ひとつの高いハードル（ストレス）になっているのが現状です。
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          05 | THE NEW LUXURY FORM (訪問点滴という新しい形)
          =================================================== */}
      <section id="service" className="pt-16 pb-20 sm:py-24 bg-white border-b border-[#E2D7CA] relative overflow-hidden">
        <div className="relative z-10 max-w-[1160px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-12 sm:mb-16 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                04 A NEW STANDARD
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                そんなあなたに、<br className="hidden sm:inline" />
                <span className="text-[#16120F]">訪問点滴という新しい形。</span>
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-5 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0 font-medium">
              クリニックに通って治療を待つのではなく、医療があなたの空間へ出向く。
              <br className="hidden sm:inline" />
              医師・医療スタッフがお客様のご指定場所に直接お伺いして施術する「完全予約・プライベート型訪問医療サービス」です。
            </p>
          </div>

          {/* =========================================================
              CONCISE & STYLISH INTERACTIVE EXPERIENCE DIAGRAM
              (コンパクトでおしゃれな体験比較スイッチ)
              ========================================================= */}
          <div className="bg-[#FAF8F5] rounded-[24px] border border-[#E2D7CA] p-6 sm:p-9 shadow-sm mb-10 relative overflow-hidden">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-0 pb-0">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#143836] uppercase font-serif block mb-1.5">
                  EXPERIENCE COMPARISON
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                  体験の違いを比較する
                </h3>
              </div>
              
              {/* Interactive Mode Toggle with explicit guides */}
              <div className="flex flex-col items-start md:items-end gap-1.5">
                <span className="text-[11px] font-semibold text-[#143836] tracking-wider block">
                  ※ タップで切り替え
                </span>
                <div className="inline-flex p-1.5 bg-white rounded-full border border-[#E2D7CA] self-start md:self-auto shadow-inner">
                  <button
                    type="button"
                    onClick={() => setCompareMode('clinic')}
                    className={`px-5 py-2 rounded-full text-xs font-serif font-extrabold transition-all cursor-pointer ${
                      compareMode === 'clinic'
                        ? 'bg-[#B8976C] text-white shadow-md'
                        : 'text-[#16120F]/60 hover:text-[#16120F]'
                    }`}
                  >
                    従来の通院
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompareMode('visit')}
                    className={`px-5 py-2 rounded-full text-xs font-serif font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      compareMode === 'visit'
                        ? 'bg-[#B8976C] text-white shadow-md'
                        : 'text-[#16120F]/60 hover:text-[#16120F]'
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${compareMode === 'visit' ? 'text-white' : 'text-[#B8976C]'}`} />
                    <span>当院の訪問点滴</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Visual Cards Display with ZERO margin */}
            <div className="mt-0 pt-0">
              {compareMode === 'visit' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
                  {/* Card 1 */}
                  <div className="bg-white border border-[#143836]/40 rounded-[16px] p-5 sm:p-6 text-center sm:text-left shadow-sm">
                    <span className="text-[10px] font-bold text-[#143836] uppercase font-serif tracking-wider block mb-2">01 / 移動時間・待ち時間</span>
                    <div className="font-serif font-bold text-[#16120F] text-[15px] xs:text-base sm:text-[14px] md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mb-2">移動・待ち時間「完全ゼロ」</div>
                    <p className="text-xs text-[#53483E] leading-relaxed font-medium">医師がご指定の場所へ直接訪問。移動の負担も、待合室でのタイムロスも一切ありません。</p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white border border-[#143836]/40 rounded-[16px] p-5 sm:p-6 text-center sm:text-left shadow-sm">
                    <span className="text-[10px] font-bold text-[#143836] uppercase font-serif tracking-wider block mb-2">02 / 身支度</span>
                    <div className="font-serif font-bold text-[#16120F] text-[15px] xs:text-base sm:text-[14px] md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mb-2">ノーメイク・部屋着で受診</div>
                    <p className="text-xs text-[#53483E] leading-relaxed font-medium">メイクや外出着に着替える必要なし。リラックスできる慣れ親しんだお部屋でお待ちいただけます。</p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white border border-[#143836]/40 rounded-[16px] p-5 sm:p-6 text-center sm:text-left shadow-sm">
                    <span className="text-[10px] font-bold text-[#143836] uppercase font-serif tracking-wider block mb-2">03 / プライバシー</span>
                    <div className="font-serif font-bold text-[#16120F] text-[15px] xs:text-base sm:text-[14px] md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mb-2">100%完全プライベート</div>
                    <p className="text-xs text-[#53483E] leading-relaxed font-medium">誰にも会わないプライベートな空間。厳格な守秘義務のもと、安心して治療を受けられます。</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
                  {/* Card 1 */}
                  <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-5 sm:p-6 text-center sm:text-left shadow-2xs">
                    <span className="text-[10px] font-bold text-[#827467] uppercase font-serif tracking-wider block mb-2">01 / 移動時間・待ち時間</span>
                    <div className="font-serif font-bold text-[#16120F] text-[15px] xs:text-base sm:text-[14px] md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mb-2">移動の手間と待合室待機</div>
                    <p className="text-xs text-[#6B5E52] leading-relaxed font-medium">クリニックまでの往復移動が必要となり、到着後も受付や待合室で順番を待つ時間が発生します。</p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-5 sm:p-6 text-center sm:text-left shadow-2xs">
                    <span className="text-[10px] font-bold text-[#827467] uppercase font-serif tracking-wider block mb-2">02 / 身支度</span>
                    <div className="font-serif font-bold text-[#16120F] text-[15px] xs:text-base sm:text-[14px] md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mb-2">外出の準備・メイクが必要</div>
                    <p className="text-xs text-[#6B5E52] leading-relaxed font-medium">体調が優れない時や休日でも、メイクや外出用の服に着替えて外出しなければなりません。</p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-5 sm:p-6 text-center sm:text-left shadow-2xs">
                    <span className="text-[10px] font-bold text-[#827467] uppercase font-serif tracking-wider block mb-2">03 / プライバシー</span>
                    <div className="font-serif font-bold text-[#16120F] text-[15px] xs:text-base sm:text-[14px] md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mb-2">待合室等で他の患者と顔合わせ</div>
                    <p className="text-xs text-[#6B5E52] leading-relaxed font-medium">他の患者様と同じ待合スペースで待機するため、知人への遭遇や周囲の視線に配慮が必要です。</p>
                  </div>
                </div>
              )}
            </div>
          </div>





          <div className="mt-12 text-center">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--line btn--shimmer text-base"
            >
              <MessageCircle className="w-5 h-5 text-[#06C755] shrink-0" />
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
          
          <div className="max-w-2xl sm:mx-auto mb-8 sm:mb-10 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                05 DRIP SELECTIONS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                美容と健康を支える3つの厳選点滴
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              エイジング、慢性疲労、美容へのアプローチ。
              お悩みやお身体の状態に合わせ、医師の判断のもとで最適に無菌調剤する当院おすすめの3大メニューです。
            </p>
          </div>

          {/* Drip 1: Premium Recovery */}
          <div className="bg-white border border-[#143836]/30 rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(22,18,15,0.06)] mb-12">
            <div className="bg-white border-b border-[#E2D7CA] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="inline-block bg-[#143836] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    人気No.1・疲労回復＆強抗酸化
                  </span>
                  <span className="text-xs font-bold tracking-widest text-[#143836] uppercase">
                    美白・全身デトックス
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F] text-center sm:text-left">
                  <span className="inline-block">プレミアムリカバリー点滴</span> <span className="inline-block text-lg sm:text-xl font-normal text-[#827467]">(Premium Recovery)</span>
                </h3>
                <p className="text-xs text-[#53483E] mt-1.5 leading-relaxed text-center sm:text-left">
                  <span className="inline-block">蓄積した疲労をリセットし、</span>
                  <span className="inline-block">本来のパフォーマンスを取り戻す</span>
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className="text-[10px] text-[#827467] block uppercase font-medium">通常料金</span>
                <span className="font-serif text-3xl font-bold text-[#16120F]">¥33,000</span>
                <span className="text-xs text-[#827467] block">（税込・往診料込）</span>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-6 sm:p-8 space-y-6" style={{ backgroundColor: '#FAF7F2' }}>
              <div className="space-y-3">
                <p className="text-[#53483E] text-sm leading-relaxed">
                  「しっかり休んだはずなのに疲れが抜けない」「頭がすっきりしない」……<br />
                  そんな現代特有の慢性的な疲労にアプローチするために開発された、当院オリジナルの特別メニューです。
                </p>
                <p className="text-[#53483E] text-sm leading-relaxed">
                  厳選された6つの医療用有効成分をバランスよく配合し、<br />
                  <strong className="font-bold text-[#16120F]">サプリメントでは到達できない濃度で、ダイレクトに細胞へエネルギーを急速充電</strong>します。
                </p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#143836] tracking-wider mb-3.5">
                  ■ 贅沢に配合された「6つの贅沢成分」とその効果
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#53483E]">
                  <div className="p-4 bg-white rounded-[10px] border border-[#E2D7CA]/70 shadow-2xs">
                    <p className="font-bold text-[#16120F] mb-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm sm:text-[15px]">
                      <span className="text-[#143836]">1. グルタチオン</span>
                      <span className="text-xs sm:text-[13px] text-[#8E6D42]">【抗酸化・肝機能サポート】</span>
                    </p>
                    <p className="text-[#6B5E52] text-xs sm:text-[13px] leading-relaxed">
                      活性酸素を抑え、肝臓の働きをサポート。疲労時の身体のコンディション維持に役立ちます。
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-[10px] border border-[#E2D7CA]/70 shadow-2xs">
                    <p className="font-bold text-[#16120F] mb-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm sm:text-[15px]">
                      <span className="text-[#143836]">2. 高濃度ビタミンC</span>
                      <span className="text-xs sm:text-[13px] text-[#8E6D42]">【抗酸化・免疫サポート】</span>
                    </p>
                    <p className="text-[#6B5E52] text-xs sm:text-[13px] leading-relaxed">
                      強い抗酸化作用で身体を酸化ストレスから守り、健康維持をサポートします。
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-[10px] border border-[#E2D7CA]/70 shadow-2xs">
                    <p className="font-bold text-[#16120F] mb-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm sm:text-[15px]">
                      <span className="text-[#143836] w-full sm:w-auto">3. ビタミンB群</span>
                      <span className="text-xs sm:text-[13px] text-[#8E6D42]">【エネルギー産生・代謝サポート】</span>
                    </p>
                    <p className="text-[#6B5E52] text-xs sm:text-[13px] leading-relaxed">
                      食事からエネルギーを作るために必要な栄養素。代謝と疲労回復を支えます。
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-[10px] border border-[#E2D7CA]/70 shadow-2xs">
                    <p className="font-bold text-[#16120F] mb-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm sm:text-[15px]">
                      <span className="text-[#143836]">4. チオクト酸（αリポ酸）</span>
                      <span className="text-xs sm:text-[13px] text-[#8E6D42]">【抗酸化・代謝サポート】</span>
                    </p>
                    <p className="text-[#6B5E52] text-xs sm:text-[13px] leading-relaxed">
                      抗酸化作用を持ち、エネルギー代謝をサポート。疲労時のコンディション維持に役立ちます。
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-[10px] border border-[#E2D7CA]/70 shadow-2xs">
                    <p className="font-bold text-[#16120F] mb-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm sm:text-[15px]">
                      <span className="text-[#143836]">5. グリチルリチン酸</span>
                      <span className="text-xs sm:text-[13px] text-[#8E6D42]">【抗炎症・肝機能サポート】</span>
                    </p>
                    <p className="text-[#6B5E52] text-xs sm:text-[13px] leading-relaxed">
                      甘草由来の成分を含み、肝機能や炎症反応をサポート。身体の調子を整えます。
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-[10px] border border-[#E2D7CA]/70 shadow-2xs">
                    <p className="font-bold text-[#16120F] mb-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm sm:text-[15px]">
                      <span className="text-[#143836]">6. マグネシウム</span>
                      <span className="text-xs sm:text-[13px] text-[#8E6D42]">【筋肉・神経のサポート】</span>
                    </p>
                    <p className="text-[#6B5E52] text-xs sm:text-[13px] leading-relaxed">
                      筋肉や神経の働きを支え、こりや緊張が気になる方のコンディション維持に役立ちます。
                    </p>
                  </div>
                </div>
              </div>

              {/* このような方に */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#E2D7CA] border-l-4 border-l-[#143836] rounded-[6px] p-4.5 sm:p-6 shadow-[0_4px_16px_rgba(13,38,37,0.06)]">
                <div className="mb-2.5">
                  <span className="text-sm sm:text-base font-bold text-[#143836] tracking-wider font-serif inline-block">
                    このような方に
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-[15px] text-[#53483E] leading-relaxed">
                  <li>肌のくすみや透明感が気になる方</li>
                  <li>睡眠をとっても翌朝に疲れが残っている方</li>
                  <li>お酒を飲む機会が多く、翌日スッキリ起きられない方</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2D7CA]">
                <span className="text-xs text-[#827467]">所要時間：約60分 / 静脈点滴投与</span>
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
          <div className="bg-white border border-[#143836]/30 rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(22,18,15,0.06)] mb-12">
            <div className="bg-white border-b border-[#E2D7CA] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold tracking-widest text-[#143836] block uppercase mb-1">
                  最先端長寿医療・サーチュイン活性
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F] text-center sm:text-left">
                  <span className="inline-block">NMNリバース点滴</span> <span className="inline-block text-lg sm:text-xl font-normal text-[#827467]">(NMN Reverse Drip)</span>
                </h3>
                <p className="text-xs text-[#53483E] mt-1 leading-relaxed text-center sm:text-left">
                  <span className="inline-block">細胞レベルで若々しさを呼び覚ます、</span>
                  <span className="inline-block">究極のウェルネス・アンチエイジング</span>
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className="text-[10px] text-[#827467] block uppercase font-medium">通常料金</span>
                <span className="font-serif text-3xl font-bold text-[#16120F]">¥49,500～</span>
                <span className="text-xs text-[#827467] block">（税込・往診料込）</span>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-6 sm:p-8 space-y-6" style={{ backgroundColor: '#FAF7F2' }}>
              <p className="text-[#53483E] text-sm leading-relaxed">
                NMN（ニコチンアミド・モノヌクレオチド）は、長寿・若々しさを司る「サーチュイン遺伝子（長寿遺伝子）」を活性化させ、エネルギーの源であるNAD+を細胞内に急速に補う成分です。<br />
                年齢とともに減少していくNMNを静脈からダイレクトに投与することで、肌の細胞再生を促し、全身の若返りをサポートします。
              </p>

              {/* このような方に */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#E2D7CA] border-l-4 border-l-[#143836] rounded-[6px] p-4.5 sm:p-6 shadow-[0_4px_16px_rgba(13,38,37,0.06)]">
                <div className="mb-2.5">
                  <span className="text-sm sm:text-base font-bold text-[#143836] tracking-wider font-serif inline-block">
                    このような方に
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-[15px] text-[#53483E] leading-relaxed">
                  <li>脳のエイジングケア（集中力・思考力の向上、睡眠の質の改善）をしたい方</li>
                  <li>若い頃に比べて、体力や集中力が落ちたと感じる方</li>
                  <li>代謝を上げ、疲れにくい身体を目指したい方</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2D7CA]">
                <span className="text-xs text-[#827467]">所要時間：約30分 / 静脈点滴投与</span>
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
          <div className="bg-white border border-[#143836]/30 rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(22,18,15,0.06)]">
            <div className="bg-white border-b border-[#E2D7CA] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold tracking-widest text-[#143836] block uppercase mb-1">
                  最先端再生医療由来・最高峰エイジングケア
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F] text-center sm:text-left">
                  <span className="inline-block">幹細胞上清液点滴</span> <span className="inline-block text-lg sm:text-xl font-normal text-[#827467]">(Stem Cell Drip)</span>
                </h3>
                <p className="text-xs text-[#53483E] mt-1 leading-relaxed text-center sm:text-left">
                  <span className="inline-block">傷ついた細胞を修復し活性化する、</span>
                  <span className="inline-block">次世代の根本エイジングアプローチ</span>
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className="text-[10px] text-[#827467] block uppercase font-medium">通常料金</span>
                <span className="font-serif text-3xl font-bold text-[#16120F]">¥99,000～</span>
                <span className="text-xs text-[#827467] block">（税込・往診料込）</span>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-6 sm:p-8 space-y-6" style={{ backgroundColor: '#FAF7F2' }}>
              <p className="text-[#53483E] text-sm leading-relaxed">
                ヒト脂肪由来の幹細胞を培養する過程で、細胞を除去したあとに残る高濃度の上澄み液（上清液）を使用した究極のエイジングケア点滴です。<br />
                この上清液には、細胞の再生や修復を促す数百種類もの「成長因子（サイトカイン）」や、情報伝達物質である「エクソソーム」が豊富に含まれており、体内の老化した組織そのものを内側から活性化へと導きます。
              </p>

              {/* このような方に */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#E2D7CA] border-l-4 border-l-[#143836] rounded-[6px] p-4.5 sm:p-6 shadow-[0_4px_16px_rgba(13,38,37,0.06)]">
                <div className="mb-2.5">
                  <span className="text-sm sm:text-base font-bold text-[#143836] tracking-wider font-serif inline-block">
                    このような方に
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-[15px] text-[#53483E] leading-relaxed">
                  <li>美容と健康を総合的に整えたい方</li>
                  <li>シワ・たるみの改善、内側からハリのある肌を目指したい方</li>
                  <li>体力や免疫力の低下など「全身の老化」が気になる方</li>
                </ul>
              </div>

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
          
          <div className="max-w-2xl mx-auto mb-10 sm:mb-12 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                06 TRIAL OFFER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                まずは、<span className="text-[#16120F]">訪問点滴をご体験ください。</span>
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              当院の訪問医療サービスを初めてご利用いただく方へ。医師自らがお伺いし、丁寧なカウンセリングと確かな技術をお届けする初回限定の特別体験プランをご用意しました。
            </p>
          </div>
 
          {/* Ticket Card */}
          <div className="bg-white border-2 border-[#E2D7CA] rounded-[20px] shadow-[0_12px_36px_rgba(22,18,15,0.08)] relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 bg-[#143836] text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-bl-[8px] uppercase z-10">
              中央区・港区限定
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Left Column: Details (White background) */}
              <div className="bg-white p-8 sm:p-12 flex flex-col justify-center" style={{ backgroundColor: '#FFFFFF' }}>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F] mb-4">
                  <span className="block text-xs font-bold text-[#8E6D42] tracking-wider mb-1">FIRST VISIT TRIAL</span>
                  <span className="inline-block">プレミアムリカバリー点滴（初回体験）</span>
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#53483E]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8E6D42] shrink-0" />
                    <span className="inline-block">医師による対面問診・カウンセリング</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8E6D42] shrink-0" />
                    <span className="inline-block">プレミアムリカバリー点滴（約40分）</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8E6D42] shrink-0" />
                    <span className="inline-block">往診料・材料費・診察代すべて込み</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8E6D42] shrink-0" />
                    <span className="inline-block">LINEによるアフターケア・美容健康相談</span>
                  </li>
                </ul>
              </div>

              {/* Right Column: Price & CTA (Subtle warm beige background) */}
              <div className="bg-[#FAF7F2] p-8 sm:p-12 border-t md:border-t-0 md:border-l border-[#E2D7CA] flex flex-col items-center md:items-end justify-center text-center md:text-right">
                
                {/* 通常 ￥33,000 (斜めに線を入れる) */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs sm:text-sm text-[#827467] font-medium">通常</span>
                  <span className="relative inline-block font-serif text-lg sm:text-xl font-bold text-[#827467] px-1 select-none">
                    ¥33,000
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <line x1="2" y1="88" x2="98" y2="12" stroke="#D9534F" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>

                {/* 初回特別体験 & → ￥22,000（税込） */}
                <div className="flex flex-col items-center md:items-end mb-1">
                  <span className="inline-block text-xs font-bold text-white bg-[#143836] px-3 py-1 rounded shadow-sm mb-1.5 tracking-wider">
                    初回特別体験
                  </span>
                  
                  <div className="relative inline-flex items-baseline justify-center md:justify-end">
                    <span className="md:relative absolute right-full mr-2 md:mr-1.5 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#DFCBA9] shadow-[0_2px_8px_rgba(142,109,66,0.15)] text-[#8E6D42] self-center shrink-0 select-none">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8E6D42]" strokeWidth={2.5} />
                    </span>
                    <span className="font-serif text-4xl sm:text-5xl font-extrabold !text-[#143836] tracking-tight">
                      ¥22,000
                    </span>
                    <span className="hidden md:inline text-xs sm:text-sm font-medium text-[#827467] whitespace-nowrap ml-2">
                      （税込・往診料込）
                    </span>
                  </div>
                  <span className="md:hidden text-xs font-medium text-[#827467] mt-1 text-center">
                    （税込・往診料込）
                  </span>
                </div>

                {/* ※これ以上の追加費用は一切かかりません。 */}
                <span className="text-[11px] text-[#827467] block mt-2 font-medium">
                  ※これ以上の追加費用は一切かかりません。
                </span>

                <div className="mt-6 w-full sm:w-auto">
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
          
          <div className="max-w-2xl sm:mx-auto mb-12 sm:mb-16 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                07 CONTINUOUS CARE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                継続的に美と健康を<br />
                <span className="text-[#16120F]">整えたい方へ</span>
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              初回体験後、ご希望の方には定期的な継続プランをご用意しています。単に点滴を打つだけではなく、医師が健康と美容を継続的に見守る service です。
            </p>
          </div>

          {/* Connected Step Bar Layout without repetitive box cards */}
          <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-4 sm:p-7 shadow-sm">
            <div className="flex flex-col md:grid md:grid-cols-3 md:divide-x divide-[#E2D7CA]">
              
              {/* Pillar 1 */}
              <div className="pb-4 md:pb-0 md:px-5 first:pt-0 first:pl-0 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#8E6D42]/10 text-[#8E6D42] flex items-center justify-center font-serif text-sm font-extrabold shrink-0">
                    01
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F]">
                    定期訪問点滴
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                  プランに応じて定期的にご自宅へ伺い、医師の診察のうえで点滴投与を行います。生活リズムを崩さず、確実にベストコンディションを維持していただけます。
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="py-4 md:py-0 md:px-5 border-t border-b border-[#E2D7CA]/60 md:border-t-0 md:border-b-0 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center font-serif text-sm font-extrabold shrink-0">
                    02
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F]">
                    美容・健康に関するご相談
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                  日頃感じている細かな体調の変化や、美容・エイジングケア、普段の栄養摂取に関する疑問まで、LINEや訪問時にいつでも医師へ気軽にご相談いただけます。
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="pt-4 md:pt-0 md:pl-5 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#7D6B58]/10 text-[#7D6B58] flex items-center justify-center font-serif text-sm font-extrabold shrink-0">
                    03
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F]">
                    定期血液検査
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                  必要に応じて定期的な血液検査を行い、客観的な数値をもとに身体の内側のコンディションを評価。適切な栄養アドバイスや最適な医療案内を行います。
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
          
          {/* Header ONLY visible on mobile, positioned above the doctor's photo */}
          <div className="lg:hidden mb-8 border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
              08 DOCTOR PROFILE
            </span>
            <h2 className="font-serif text-2xl text-[#16120F] font-bold leading-tight">
              点滴を熟知した医師が、<br />
              <span className="text-[#16120F]">ご自宅までお伺いします</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4">
              <div className="aspect-square sm:aspect-[3/4] rounded-[12px] overflow-hidden border border-[#E2D7CA] shadow-[0_12px_36px_rgba(22,18,15,0.08)]">
                <img 
                  src={doctorPhoto} 
                  alt="LIF SKIN CLINIC 院長 宇佐美 潤" 
                  className="w-full h-full object-cover object-top scale-[1.2] origin-top -translate-y-3 sm:scale-100 sm:translate-y-0 transition-transform duration-300"
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
              {/* Header ONLY visible on desktop */}
              <div className="hidden lg:block border-l-2 border-[#143836]/60 pl-4 py-0.5">
                <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                  08 DOCTOR PROFILE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16120F] leading-tight">
                  点滴を熟知した医師が、<br className="hidden sm:inline" />
                  <span className="text-[#16120F]">ご自宅までお伺いします</span>
                </h2>
              </div>
              
              <p className="text-[#53483E] text-sm leading-relaxed">
                こんにちは。LIF SKIN CLINIC 院長の宇佐美潤です。私は大学病院などで約10年間、麻酔科医として勤務したのち、美容医療の世界へ進みました。
              </p>
              
              <p className="text-[#53483E] text-sm leading-relaxed">
                麻酔科では、日々の手術の中で無数の静脈確保や全身の循環管理を行い、最善の安全性管理を徹底してまいりました。その技術を活かし、現在行っている美容医療でも、お客様が不安なく施術を受けられるよう細やかな配慮を大切にしています。
              </p>

              <p className="text-[#53483E] text-sm leading-relaxed">
                「仕事が忙しくてクリニックへ行く時間がない」「移動せず、リラックスしたプライベートな空間で最高峰のケアを受けたい」
              </p>

              <p className="text-[#53483E] text-sm leading-relaxed">
                そうしたお声にお応えするために、ご自宅やオフィスで完結する訪問点滴事業をスタートいたしました。点滴を受けることだけでなく、ご自身の美容やお身体のコンディションについて何でもお気軽にご相談ください。
              </p>

              <div className="pt-2">
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer text-xs py-3 px-6 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
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
          
          <div className="max-w-2xl sm:mx-auto mb-12 sm:mb-16 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                09 SAFETY & QUALITY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                安心して点滴を受けていただくために
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
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
          
          <div className="max-w-2xl sm:mx-auto mb-14 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                10 HOW TO USE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                ご利用の流れ
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              ご予約から点滴後のアフターケアまで、スムーズかつ快適に完結します。
            </p>
          </div>

          {/* Connected Process Flow Timeline */}
          <div className="relative">
            {/* Desktop connecting horizontal line */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-[#E2D7CA] z-0" />

            {/* Vertical connecting line ONLY visible below lg */}
            <div className="absolute left-[28px] top-4 bottom-4 w-[1.5px] bg-[#E2D7CA] lg:hidden z-0" />

            <div className="relative pl-0 lg:pl-0 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8 z-10">
              
              {/* Step 1 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span className="text-[#143836]">01</span>
                  </div>
                </div>
                <div className="space-y-1.5 pt-1 lg:pt-0">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F] text-left lg:text-center">
                    LINEからお問い合わせ
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed text-left lg:text-center">
                    下記のボタンをタップして、ご希望の日時や気になっていることをお問い合わせいただけます。
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span className="text-[#143836]">02</span>
                  </div>
                </div>
                <div className="space-y-1.5 pt-1 lg:pt-0">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F] text-left lg:text-center">
                    事前確認・日程調整
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed text-left lg:text-center">
                    ご希望日時、訪問先、体調や既往歴、内服薬などを確認します。
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span className="text-[#143836]">03</span>
                  </div>
                </div>
                <div className="space-y-1.5 pt-1 lg:pt-0">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F] text-left lg:text-center">
                    ご自宅へ訪問し診察・点滴
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed text-left lg:text-center">
                    点滴を行うための小さなスペースをご用意いただくだけ。特別な準備は必要ありません。
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span className="text-[#143836]">04</span>
                  </div>
                </div>
                <div className="space-y-1.5 pt-1 lg:pt-0">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#16120F] text-left lg:text-center">
                    アフターケア
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed text-left lg:text-center">
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
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>LINEで訪問可能日時を確認する</span>
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          10 | VIDEO EMBED (施術・サービス紹介動画)
          =================================================== */}
      <section className="pt-12 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[960px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-12 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                11 CONCEPT MOVIE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                訪問点滴の様子を<span className="text-[#16120F]">動画で見る</span>
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              ご自宅でのリラックスした施術風景や、医師による丁寧な対応を映像でご確認いただけます。
            </p>
          </div>

          {/* Video Player Frame Container */}
          <div className="bg-white border-2 border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-lg p-2 sm:p-4">
            <div className="relative aspect-video w-full rounded-[10px] overflow-hidden bg-black shadow-inner">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/0zCKHOX6LCk"
                title="LIF SKIN CLINIC 訪問点滴のご紹介"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          09 | FAQ (よくあるご質問)
          =================================================== */}
      <section id="faq" className="pt-12 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6">
          
          <div className="mb-16 text-left sm:text-center flex sm:justify-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                12 FAQ
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                よくあるご質問
              </h2>
            </div>
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
                    <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#53483E] leading-relaxed border-t border-[#E2D7CA]/40 bg-white">
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
          
          <div className="max-w-2xl sm:mx-auto mb-12 sm:mb-16 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                13 VOICES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                ご利用いただいた方の声
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
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
                <span>NMN点滴利用</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-sm relative">
              <span className="font-serif text-4xl text-[#8E6D42]/30 absolute top-4 right-5 leading-none">“</span>
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">
                  コンサルティング会社役員・50代男性
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
            14 SERVICE AREA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold">
            対応エリア
          </h2>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2D7CA] rounded-full shadow-sm text-sm sm:text-base font-serif font-bold text-[#16120F]">
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
          
          <div className="mb-12 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                15 CONTACT & INQUIRY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                まずは気軽にご質問ください
              </h2>
            </div>
            <p className="text-xs text-[#827467] mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              タップすると質問内容が自動で入力されます
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
                  className="btn btn--gold btn--shimmer w-full text-sm py-3.5 whitespace-nowrap"
                >
                  <Send className="w-4 h-4 text-[#7A5723] shrink-0" />
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
      <footer className="bg-[#382E26] text-[#FAF8F5] py-14 border-t border-[#4E4137]">
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
                <span className="inline-block">東京都中央区勝どき6-3-2</span><br />
                <span className="inline-block">※本訪問点滴サービスは、医師による完全予約制の往診診療です。</span>
                <span className="inline-block">事前のご予約・ご相談は公式LINEまたは当サイトより承っております。</span>
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold !text-[#DFCBA9] tracking-wider">
                【自由診療に関する法的掲示】
              </h4>
              <p className="leading-relaxed text-white/80">
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
