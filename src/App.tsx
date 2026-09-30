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
  Stethoscope,
  HeartPulse
} from 'lucide-react'
import doctorPhoto from './assets/images/宣材写真5.jpg'
import scenePhoto from './assets/images/3人の点滴風景.png'
import waitingManPhoto from './assets/images/時間待ちの男性.png'
import suppliPhoto from './assets/images/サプリ.png'
import tentekiPhoto from './assets/images/点滴.png'

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

  // Section 05: Comparison mode ("visit" | "clinic")
  const [compareMode, setCompareMode] = useState<'visit' | 'clinic'>('visit')

  // Section 06: Detailed Ingredients Accordion State
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(true)

  // Section 06: Estimator calculator states
  const [estimateRegion, setEstimateRegion] = useState<number>(0)
  const [estimateDripType, setEstimateDripType] = useState<string>('recovery')
  const [estimateOptions, setEstimateOptions] = useState<boolean>(false)

  // Section 15: Interactive booking / contact question state
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
    recovery: { name: 'プレミアムリカバリー点滴 (初回体験: ¥22,000 / 通常: ¥33,000)', price: 22000 },
    nmn: { name: 'NMNリバース点滴 (エイジングケア)', price: 49500 },
    stemcell: { name: '幹細胞上清液点滴 (最高峰ケア)', price: 99000 }
  }

  const basePrice = dripPrices[estimateDripType]?.price || 22000
  const regionFee = regionFees[estimateRegion]?.fee || 0
  const optionFee = estimateOptions ? 3000 : 0
  const calculatedTotal = basePrice + regionFee + optionFee

  const faqs: FAQItem[] = [
    {
      question: "自宅に特別な準備やスペースは必要ですか？",
      answer: "特別な設備は不要です。リラックスして点滴を受けられるソファやベッド、椅子と、医療器具を置くための小さなスペース（テーブルやサイドボード等）があれば実施できます。"
    },
    {
      question: "点滴の所要時間はどのくらいですか？",
      answer: "医師による事前の問診・診察を含め、全体で約60〜90分が目安です。点滴そのものの投与時間はメニューにより異なり、約30〜60分となります。"
    },
    {
      question: "初回体験を受けた後、定期プランを契約しなければいけませんか？",
      answer: "いいえ。定期契約などの義務は一切ございません。まずは一度ご自宅での点滴体験をお試しいただき、ご満足いただけた場合のみ次回以降のご案内をいたします。"
    },
    {
      question: "家族や友人が同じ部屋にいても大丈夫ですか？",
      answer: "はい、全く問題ありません。ご家族やご友人がご同席された状態でも施術をお受けいただけます。"
    },
    {
      question: "持病や現在服用中の薬があっても受けられますか？",
      answer: "持病や内服薬の内容により安全性を個別判断いたします。ご予約時の事前確認および当日の医師の問診・診察のもと、安全が確保できる場合にのみ施術を行います。"
    },
    {
      question: "支払い方法は何に対応していますか？",
      answer: "各種クレジットカード、現金、主要な電子マネー・QRコード決済に対応しております。"
    },
    {
      question: "中央区・港区以外でも訪問してもらえますか？",
      answer: "はい。千代田区・渋谷区・新宿区（出張費 ¥3,000）、その他東京23区内（出張費 ¥5,000）にて往診対応しております。その他のエリアもお気軽にご相談ください。"
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
          Header & Navigation (2-Tier PC Layout)
          =================================================== */}
      <header className="site-header">
        {/* 上段: クリニック名 / ロゴ ＆ 問い合わせ・予約ボタン */}
        <div className="max-w-[1160px] mx-auto px-6 h-[68px] lg:h-[72px] flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="logo-wrap">
            <span className="logo-title text-xl sm:text-[22px] tracking-[0.08em] font-serif text-[#16120F]">LIF SKIN CLINIC</span>
            <span className="logo-sub text-[10px] sm:text-[11px] tracking-[0.14em] text-[#8E6D42]">VISIT DRIP / 訪問点滴</span>
          </a>

          {/* Header CTAs & Hamburger */}
          <div className="flex items-center gap-3">
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
                <span>初回予約</span>
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
        </div>

        {/* 下段 (PC版): ナビゲーションメニュー */}
        <div className="hidden lg:block border-t border-[#E2D7CA]/80 bg-[#FAF8F5]/95">
          <div className="max-w-[1160px] mx-auto px-6 h-[44px] flex items-center justify-center">
            <nav className="flex items-center justify-center gap-7 xl:gap-8">
              <a href="#about-intro" className="header-link text-[13px] tracking-wide hover:text-[#143836]">点滴という選択</a>
              <span className="text-[#D3C7B8] text-xs select-none">/</span>
              <a href="#service-time" className="header-link text-[13px] tracking-wide hover:text-[#143836]">使う時間の違い</a>
              <span className="text-[#D3C7B8] text-xs select-none">/</span>
              <a href="#menu-detail" className="header-link text-[13px] tracking-wide hover:text-[#143836]">メニュー・料金</a>
              <span className="text-[#D3C7B8] text-xs select-none">/</span>
              <a href="#doctor" className="header-link text-[13px] tracking-wide hover:text-[#143836]">担当医師</a>
              <span className="text-[#D3C7B8] text-xs select-none">/</span>
              <a href="#trial" className="header-link text-[13px] tracking-wide hover:text-[#143836]">初回体験</a>
              <span className="text-[#D3C7B8] text-xs select-none">/</span>
              <a href="#safety" className="header-link text-[13px] tracking-wide hover:text-[#143836]">安全管理体制</a>
              <span className="text-[#D3C7B8] text-xs select-none">/</span>
              <a href="#flow" className="header-link text-[13px] tracking-wide hover:text-[#143836]">ご利用の流れ</a>
              <span className="text-[#D3C7B8] text-xs select-none">/</span>
              <a href="#faq" className="header-link text-[13px] tracking-wide hover:text-[#143836]">よくある質問</a>
            </nav>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E2D7CA] p-6 space-y-4 shadow-xl">
            <a href="#about-intro" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">点滴という選択</a>
            <a href="#service-time" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">使う時間の違い</a>
            <a href="#menu-detail" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">目的別メニュー・料金</a>
            <a href="#doctor" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">担当医師紹介</a>
            <a href="#trial" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">初回体験案内</a>
            <a href="#safety" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">安全管理体制</a>
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
          01 | ファーストビュー (Hero Section)
          =================================================== */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:py-14 lg:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        {/* Ambient background image: 施術風景 */}
        <div className="absolute top-0 left-0 right-0 h-[560px] sm:h-[640px] lg:h-full pointer-events-none z-0 overflow-hidden">
          <img 
            src={scenePhoto} 
            alt="リラックスできるプライベート空間での訪問点滴風景"
            className="w-full h-full object-cover object-[center_20%] lg:object-right opacity-50 sm:opacity-40 lg:opacity-25 filter contrast-[1.04]"
          />
          {/* Responsive overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/60 to-[#FAF8F5] lg:bg-gradient-to-r lg:from-[#FAF8F5] lg:via-[#FAF8F5]/92 lg:to-[#FAF8F5]/35" />
        </div>

        <div className="relative z-10 max-w-[1160px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Exclusive Area Capsule Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143836] text-[#FAF8F5] shadow-sm border border-[#143836]/30">
              <MapPin className="w-3.5 h-3.5 text-[#DFCBA9] shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.08em] text-[#FAF8F5]">
                <span className="inline-block">東京都中央区・港区限定</span>
                <span className="inline-block sm:ml-1">/ 医師直接訪問</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[44px] text-[#16120F] leading-[1.35] tracking-[0.02em]">
              <span className="inline-block">通院の手間なく、</span>
              <br />
              <span className="inline-block">いつもの自宅で。</span>
              <br />
              <span className="inline-block text-[#143836]">最上級のプライベート点滴医療。</span>
            </h1>

            <p className="text-[#8E6D42] font-semibold text-sm sm:text-base tracking-[0.06em] font-serif">
              <span className="inline-block">移動・待ち時間ゼロ</span> <span className="inline-block">/ 麻酔科専門医が直接ご自宅へ往診</span>
            </p>

            <p className="text-[#3D332B] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              クリニックに通院する煩わしさや待ち時間をなくし、ご自宅やプライベートオフィスで医療グレードの全身コンディショニングをお受けいただけます。
            </p>

            {/* Price Pill */}
            <div className="hero-price-pill !border-l-[#143836] !flex-col sm:!flex-row !items-start sm:!items-center !gap-1 sm:!gap-3.5 !py-3 !px-4 sm:!py-3 sm:!px-5.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-xs font-bold text-[#143836] tracking-wider inline-block">初回体験プラン</span>
                <span className="font-serif text-2xl font-bold text-[#143836] inline-block">¥22,000</span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#827467] inline-block">（税込・往診料・診察代すべて込 / 通常 ¥33,000）</span>
            </div>

            {/* Buttons Group */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn--line btn--shimmer text-[14px] sm:text-base px-4 py-3.5 sm:px-7 sm:py-4 whitespace-nowrap gap-2 sm:gap-2.5"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#06C755] shrink-0" />
                <span className="inline-block">初回体験をLINEで予約する</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 shrink-0" />
              </a>
              <a 
                href="#contact-form" 
                className="btn btn--gold btn--shimmer text-[14px] sm:text-base px-4 py-3.5 sm:px-7 sm:py-4 whitespace-nowrap gap-2 sm:gap-2.5"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A5723] shrink-0" />
                <span className="inline-block">WEB予約フォームへ</span>
              </a>
            </div>

            {/* Feature Bullets */}
            <div className="pt-5 border-t border-[#E2D7CA] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#53483E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9E7D52] shrink-0" />
                <span className="inline-block">麻酔科専門医が直接往診</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E7D52] shrink-0" />
                <span className="inline-block">完全個室・移動待ち時間ゼロ</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#9E7D52] shrink-0" />
                <span className="inline-block">追加費用なし・明朗会計</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Preview Card */}
          <div className="lg:col-span-5 bg-white border border-[#E2D7CA] p-5 sm:p-7 rounded-[16px] shadow-[0_12px_36px_rgba(22,18,15,0.06)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2D7CA] pb-3">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D52]"></span>
                <span className="inline-block">はじめてご利用の方へ</span>
              </h3>
              <span className="text-[10px] font-bold text-[#9E7D52] tracking-wider uppercase font-serif">TRIAL GUIDE</span>
            </div>

            <div className="space-y-3 text-xs text-[#53483E] leading-relaxed">
              <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/80">
                <p className="font-bold text-[#16120F] mb-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#143836]" />
                  <span>医療従事者がご指定場所へ往診</span>
                </p>
                <p className="text-[#6B5E52] text-[11.5px]">ご自宅のリビングや寝室で、横になったまま点滴施術をお受けいただけます。</p>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/80">
                <p className="font-bold text-[#16120F] mb-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#143836]" />
                  <span>初診料・往診料・点滴すべて込み</span>
                </p>
                <p className="text-[#6B5E52] text-[11.5px]">初回体験は明朗会計 ¥22,000（税込）。追加の押し売り等は一切ございません。</p>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/80">
                <p className="font-bold text-[#16120F] mb-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#143836]" />
                  <span>LINEまたはWEBで簡単完結</span>
                </p>
                <p className="text-[#6B5E52] text-[11.5px]">ご希望の日時と訪問先を送信するだけで、スムーズに日程調整が完了します。</p>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="#trial" 
                className="btn btn--gold btn--shimmer w-full text-xs !py-3 text-center justify-center font-bold"
              >
                初回体験プランの詳細を見る
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          02〜04 | 導入セクション (悩みへの共感 → 点滴という選択 → 通院のハードル)
          ※コンパクトでテンポよく読める導入構成
          =================================================== */}
      <section id="about-intro" className="py-14 sm:py-18 bg-[#F3ECE4]/70 border-b border-[#E2D7CA]/60">
        <div className="max-w-[1040px] mx-auto px-6">
          
          {/* 02: 悩みへの共感 */}
          <div className="max-w-2xl sm:mx-auto mb-8 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1 font-serif">
                01 CONCERNS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-tight">
                こんなお悩みはありませんか？
              </h2>
            </div>
          </div>

          {/* 4 Concern Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 shadow-2xs">
              <span className="text-[10px] font-bold text-[#8E6D42] uppercase font-serif tracking-wider block mb-1">CONCERN 01</span>
              <h3 className="font-serif text-[15px] font-bold text-[#16120F] mb-1.5">疲労が抜けにくくなってきた</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">睡眠をとっても朝すっきり起きられない、日中のだるさが続く。</p>
            </div>

            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 shadow-2xs">
              <span className="text-[10px] font-bold text-[#8E6D42] uppercase font-serif tracking-wider block mb-1">CONCERN 02</span>
              <h3 className="font-serif text-[15px] font-bold text-[#16120F] mb-1.5">仕事の集中力を維持したい</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">連日のハードスケジュールの中でも、高いパフォーマンスを保ちたい。</p>
            </div>

            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 shadow-2xs">
              <span className="text-[10px] font-bold text-[#8E6D42] uppercase font-serif tracking-wider block mb-1">CONCERN 03</span>
              <h3 className="font-serif text-[15px] font-bold text-[#16120F] mb-1.5">休日や趣味を元気に楽しみたい</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">ゴルフや旅行、会食などの予定を、疲れを残さず万全で楽しみたい。</p>
            </div>

            <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 shadow-2xs">
              <span className="text-[10px] font-bold text-[#8E6D42] uppercase font-serif tracking-wider block mb-1">CONCERN 04</span>
              <h3 className="font-serif text-[15px] font-bold text-[#16120F] mb-1.5">肌のくすみ・調子が気になる</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">透明感の低下や年齢に伴うコンディションの乱れを身体の内側からケアしたい。</p>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          02 | 点滴という選択肢 (専用セクション)
          =================================================== */}
      <section id="iv-therapy" className="py-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-8 sm:mb-10 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1 font-serif">
                02 IV THERAPY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-tight">
                そのお悩みに、<br />
                点滴という選択肢を。
              </h2>
            </div>
            
            {/* なぜ、今「点滴ケア」なのか？ (Regular Text) */}
            <div className="mt-5 sm:mt-6 text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#143836] mb-2">
                なぜ、今「点滴ケア」なのか？
              </h3>
              <p className="text-[#53483E] text-sm sm:text-base leading-relaxed">
                点滴は、必要な成分を静脈から直接体内へ届ける方法です。美容・健康を意識したコンディションケアの選択肢として取り入れられています。
              </p>
            </div>
          </div>

          {/* 2 Points of IV Therapy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* Card 1: サプリメントとの違い */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] sm:rounded-[20px] p-5 sm:p-8 shadow-[0_4px_20px_rgba(22,18,15,0.04)] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-start">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#8E6D42] font-serif uppercase bg-[#F3ECE4] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  POINT 01
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#143836]/5 text-[#143836] flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#143836]" />
                </div>
              </div>
              <h3 className="font-serif text-base sm:text-xl font-bold text-[#16120F] mb-1.5 sm:mb-3 leading-snug">
                サプリメントとの違い
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                サプリメントが消化管から成分を吸収するのに対し、点滴は消化管を介さず、静脈から直接投与します。
              </p>
              <div className="mt-4 overflow-hidden rounded-[14px]">
                <img 
                  src={suppliPhoto} 
                  alt="サプリメントとの違い" 
                  className="w-full h-auto object-cover max-h-[220px]"
                />
              </div>
            </div>

            {/* Card 2: 点滴だからできること */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] sm:rounded-[20px] p-5 sm:p-8 shadow-[0_4px_20px_rgba(22,18,15,0.04)] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-start">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#8E6D42] font-serif uppercase bg-[#F3ECE4] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  POINT 02
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#143836]/5 text-[#143836] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8E6D42]" />
                </div>
              </div>
              <h3 className="font-serif text-base sm:text-xl font-bold text-[#16120F] mb-1.5 sm:mb-3 leading-snug">
                点滴だからできること
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                ビタミンやミネラルなど、目的に合わせた複数の成分を点滴で補うことができます。疲れや肌の調子などのお悩みに合わせ、医師が適応を判断し、ケアをご提案します。
              </p>
              <div className="mt-4 overflow-hidden rounded-[14px]">
                <img 
                  src={tentekiPhoto} 
                  alt="点滴だからできること" 
                  className="w-full h-auto object-cover max-h-[220px]"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          03 | 通院のハードル (専用セクション)
          =================================================== */}
      <section id="clinic-barrier" className="py-16 sm:py-20 bg-[#F3ECE4]/70 border-b border-[#E2D7CA]/60">
        <div className="max-w-[1040px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#8E6D42]/80 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1 font-serif">
                03 THE BARRIER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-tight">
                点滴は受けたい。<br />
                でも、通院は負担。
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              点滴を受けたいと思っても、移動の手間、待合室での待ち時間、身支度……。
              忙しい日常の中でクリニックに足を運ぶこと自体が、大きな負担（タイムロス）になっていませんか？
            </p>
          </div>

          {/* Waiting Man Image */}
          <div className="mt-8 max-w-md sm:max-w-lg mx-auto overflow-hidden rounded-[20px] shadow-sm border border-[#E2D7CA] bg-white">
            <img 
              src={waitingManPhoto} 
              alt="通院や待ち時間の負担" 
              className="w-full h-auto object-cover max-h-[380px]"
            />
          </div>

        </div>
      </section>

      {/* ===================================================
          05 | 訪問点滴の提案・メリット
          「同じ点滴でも、“使う時間”は大きく変わります。」
          =================================================== */}
      <section id="service-time" className="py-10 sm:py-24 bg-white border-b border-[#E2D7CA] relative overflow-hidden">
        <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-6 sm:mb-12 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-3.5 sm:pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1 font-serif">
                04 A NEW STANDARD
              </span>
              <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                そんなあなたに、<br className="hidden sm:inline" />
                <span className="text-[#16120F]">ご自宅へ伺う訪問点滴という形。</span>
              </h2>
            </div>
            <p className="text-[#53483E] text-xs sm:text-base mt-2.5 sm:mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-3.5 sm:pl-0">
              クリニックに通って順番を待つのではなく、医療があなたの空間へ出向く。
              移動の手間や待ち時間をなくし、点滴の時間を自分らしい贅沢なひとときに変えます。
            </p>
          </div>

          {/* =========================================================
              採用セクション:「同じ点滴でも、“使う時間”は大きく変わります。」
              (インタラクティブ比較切り替え)
              ========================================================= */}
          <div className="bg-[#FAF8F5] rounded-[20px] sm:rounded-[24px] border border-[#E2D7CA] p-4 sm:p-8 shadow-sm mb-4 sm:mb-6 relative overflow-hidden">
            
            <div className="text-center mb-5 sm:mb-6">
              <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.2em] text-[#143836] uppercase font-serif block mb-1">
                TIME VALUE COMPARISON
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#16120F]">
                同じ点滴でも、“使う時間”は大きく変わります。
              </h3>
            </div>

            {/* 2-Button Interactive Tab Switcher */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-2xl mx-auto mb-4 sm:mb-6">
              {/* Tab 1: 一般的な通院 */}
              <button
                type="button"
                onClick={() => setCompareMode('clinic')}
                className={`p-3 sm:p-4 rounded-[16px] text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  compareMode === 'clinic'
                    ? 'bg-[#F7F3EE] border-[#8E6D42] shadow-sm'
                    : 'bg-white/70 border-[#E2D7CA] hover:bg-white hover:border-[#D0C2B2] opacity-75'
                }`}
              >
                <span className={`font-serif text-sm sm:text-lg font-bold tracking-tight whitespace-nowrap ${
                  compareMode === 'clinic' ? 'text-[#16120F]' : 'text-[#6B5E52]'
                }`}>
                  一般的な通院
                </span>
                <span className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${
                  compareMode === 'clinic'
                    ? 'bg-[#E4DCD0] text-[#5C4F42]'
                    : 'bg-[#ECE5DC] text-[#7D6E60]'
                }`}>
                  3〜4時間拘束
                </span>
              </button>

              {/* Tab 2: 当院の訪問点滴 */}
              <button
                type="button"
                onClick={() => setCompareMode('visit')}
                className={`p-3 sm:p-4 rounded-[16px] text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  compareMode === 'visit'
                    ? 'bg-white border-[#143836] shadow-sm'
                    : 'bg-white/70 border-[#E2D7CA] hover:bg-white hover:border-[#D0C2B2] opacity-75'
                }`}
              >
                <span className={`font-serif text-sm sm:text-lg font-bold tracking-tight whitespace-nowrap flex items-center gap-1 sm:gap-1.5 ${
                  compareMode === 'visit' ? 'text-[#143836]' : 'text-[#6B5E52]'
                }`}>
                  <Sparkles className={`w-3.5 h-3.5 ${compareMode === 'visit' ? 'text-[#8E6D42]' : 'text-[#8E6D42]/60'}`} />
                  <span>当院の訪問点滴</span>
                </span>
                <span className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${
                  compareMode === 'visit'
                    ? 'bg-[#143836] text-white'
                    : 'bg-[#ECE5DC] text-[#7D6E60]'
                }`}>
                  30分～60分で終了
                </span>
              </button>
            </div>

            {/* Interactive Visual Card Display */}
            <div className="max-w-2xl mx-auto">
              {compareMode === 'clinic' ? (
                /* 従来の通院 */
                <div className="bg-[#F7F3EE] border border-[#E2D7CA] rounded-[18px] sm:rounded-[20px] p-4 sm:p-7 shadow-sm">
                  {/* 8 Numbered Steps */}
                  <div className="py-3 sm:py-6 space-y-2 sm:space-y-4">
                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        自宅を出る（身支度）
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        クリニックへの移動
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        3
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        受付・問診票の記入
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        4
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        待合室での待ち時間
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        5
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        医師の診察
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        6
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        点滴の施術（約30〜60分）
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        7
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        会計・次回の予約待ち
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#DCD1C2] text-[#5C4F42] font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0">
                        8
                      </span>
                      <span className="text-[13px] sm:text-base font-medium text-[#221D18]">
                        自宅への帰宅
                      </span>
                    </div>
                  </div>

                  {/* Large Font Highlighted Takeaway Message */}
                  <div className="bg-[#FAF8F5] border border-[#D9CFC3] rounded-[12px] sm:rounded-[14px] py-4 sm:py-5 px-6 mt-3 sm:mt-4 shadow-sm text-center">
                    <p className="font-serif font-bold text-lg sm:text-2xl text-[#3D2C1E] tracking-wider text-center whitespace-nowrap">
                      時間と労力のロス
                    </p>
                  </div>
                </div>
              ) : (
                /* 訪問点滴 */
                <div className="bg-[#FAF8F5] border-2 border-[#143836] rounded-[18px] sm:rounded-[20px] p-4 sm:p-7 shadow-sm">
                  {/* 4 Numbered Steps */}
                  <div className="py-3 sm:py-5 space-y-2.5 sm:space-y-5">
                    {/* Step 1 */}
                    <div className="flex items-start gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#143836] text-white font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <h5 className="font-serif font-bold text-[14px] sm:text-lg text-[#16120F]">
                          医師がご自宅へ到着
                        </h5>
                        <p className="text-[11.5px] sm:text-[13px] text-[#6B5E52] mt-0.5 leading-relaxed">
                          外出の準備も、往復の移動も一切不要です。
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#143836] text-white font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <h5 className="font-serif font-bold text-[14px] sm:text-lg text-[#16120F]">
                          医師による対面診察
                        </h5>
                        <p className="text-[11.5px] sm:text-[13px] text-[#6B5E52] mt-0.5 leading-relaxed">
                          体調やご要望を確認し、最適な点滴をご提案します。
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#143836] text-white font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <h5 className="font-serif font-bold text-[14px] sm:text-lg text-[#16120F]">
                          いつもの空間で点滴
                        </h5>
                        <p className="text-[11.5px] sm:text-[13px] text-[#6B5E52] mt-0.5 leading-relaxed">
                          PC作業、読書、歓談など自由にお過ごしいただけます。
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-start gap-2.5 sm:gap-4">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#143836] text-white font-serif font-bold text-[11px] sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        4
                      </span>
                      <div>
                        <h5 className="font-serif font-bold text-[14px] sm:text-lg text-[#16120F]">
                          終了・そのまま休息
                        </h5>
                        <p className="text-[11.5px] sm:text-[13px] text-[#6B5E52] mt-0.5 leading-relaxed">
                          点滴終了後は、そのまま自宅でリラックスできます。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Note box */}
                  <div className="bg-[#FAF8F5] border border-[#D9CFC3] rounded-[10px] sm:rounded-[14px] p-3 sm:p-5 mt-2">
                    <p className="text-[11px] sm:text-sm text-[#221D18] font-medium flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[#143836] font-bold text-xs sm:text-sm">✓</span>
                      <span>ノーメイクや部屋着のまま、リラックスした空間でお待ちいただけます。</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[10.5px] sm:text-[11px] text-[#827467] text-center mt-3 sm:mt-5">
              ※点滴自体の投与時間は約30〜60分程度必要です。訪問点滴は施術時間を短縮するものではなく、移動や待機のストレスを省き、時間を有意義に過ごすための医療サービスです。
            </p>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--line btn--shimmer text-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>LINEで訪問可能日時を確認する</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          06 | 目的別点滴メニュー・料金
          07 | 担当医師の紹介
          08 | 初回体験の案内
          ※この3セクションを間に挟まず連続配置
          =================================================== */}

      {/* 06: 目的別点滴メニュー・料金 */}
      <section id="menu-detail" className="pt-16 pb-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-12 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                05 DRIP MENUS & PRICING
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                目的別点滴メニュー・料金
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              疲労回復、エイジングケア、最高峰の再生医療由来ケアまで。
              お悩みや目的に合わせ、医師の判断のもとで最適に調剤する3つの厳選メニューです。
            </p>
          </div>

          {/* 3 Menu Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Menu 1: プレミアムリカバリー点滴 */}
            <div className="bg-white border-2 border-[#143836]/40 rounded-[18px] p-6 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#143836] text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-[8px] uppercase">
                人気No.1 / 初回体験対象
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#8E6D42] tracking-wider uppercase block font-serif mb-1">
                    疲労回復・強抗酸化・美肌
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                    プレミアムリカバリー点滴
                  </h3>
                  <p className="text-xs text-[#827467] mt-0.5">蓄積した疲労を急速リセットし、本来の活力を取り戻す</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#827467]">通常料金</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl font-bold text-[#16120F]">¥33,000</span>
                      <span className="text-[11px] text-[#827467]">（税込・往診料込）</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between mt-1 pt-1 border-t border-[#E2D7CA]/60 text-[#143836]">
                    <span className="text-xs font-bold">初回特別体験価格</span>
                    <span className="font-serif text-2xl font-bold">¥22,000</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#53483E]">
                  <p className="font-bold text-[#16120F]">【主な配合成分】</p>
                  <p className="leading-relaxed text-[#6B5E52]">
                    グルタチオン（抗酸化・肝サポート）、高濃度ビタミンC、ビタミンB群（代謝・エネルギー産生）、チオクト酸（αリポ酸）、グリチルリチン酸、マグネシウム
                  </p>
                  <p className="pt-1 text-[#827467]">所要時間：約60分（静脈点滴投与）</p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E2D7CA]">
                <a 
                  href="#trial" 
                  className="btn btn--gold btn--shimmer w-full text-xs !py-3 text-center justify-center font-bold"
                >
                  初回体験プランを予約
                </a>
              </div>
            </div>

            {/* Menu 2: NMNリバース点滴 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[18px] p-6 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#8E6D42] tracking-wider uppercase block font-serif mb-1">
                    長寿遺伝子活性・エイジングケア
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                    NMNリバース点滴
                  </h3>
                  <p className="text-xs text-[#827467] mt-0.5">細胞レベルで若々しさとエネルギーを呼び覚ます</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#827467]">料金</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl font-bold text-[#16120F]">¥49,500〜</span>
                      <span className="text-[11px] text-[#827467]">（税込・往診料込）</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#827467] block mt-0.5">※投与量（100mg〜）に応じてご案内</span>
                </div>

                <div className="space-y-2 text-xs text-[#53483E]">
                  <p className="font-bold text-[#16120F]">【特徴と目的】</p>
                  <p className="leading-relaxed text-[#6B5E52]">
                    年齢とともに減少する補酵素NAD+を効率よく補い、サーチュイン遺伝子（長寿遺伝子）を活性化。思考力や集中力、全身の代謝向上を目指す方に。
                  </p>
                  <p className="pt-1 text-[#827467]">所要時間：約30分（静脈点滴投与）</p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E2D7CA]">
                <button 
                  onClick={() => applyPresetQuestion('NMNリバース点滴')}
                  className="btn btn--gold btn--shimmer w-full text-xs !py-3 text-center justify-center font-bold"
                >
                  この点滴について問い合わせる
                </button>
              </div>
            </div>

            {/* Menu 3: 幹細胞上清液点滴 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[18px] p-6 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#8E6D42] tracking-wider uppercase block font-serif mb-1">
                    最高峰再生医療由来ケア
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                    幹細胞上清液点滴
                  </h3>
                  <p className="text-xs text-[#827467] mt-0.5">老化した組織を修復し活性化する根本アプローチ</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#827467]">料金</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl font-bold text-[#16120F]">¥99,000〜</span>
                      <span className="text-[11px] text-[#827467]">（税込・往診料込）</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#827467] block mt-0.5">※厳格な基準で管理された国産上清液を使用</span>
                </div>

                <div className="space-y-2 text-xs text-[#53483E]">
                  <p className="font-bold text-[#16120F]">【特徴と目的】</p>
                  <p className="leading-relaxed text-[#6B5E52]">
                    数百種類の成長因子（サイトカイン）やエクソソームを含有。細胞修復を促進し、美容・体力・活力の根本的な若返りをサポートします。
                  </p>
                  <p className="pt-1 text-[#827467]">所要時間：約30〜45分（静脈点滴投与）</p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E2D7CA]">
                <button 
                  onClick={() => applyPresetQuestion('幹細胞上清液点滴')}
                  className="btn btn--gold btn--shimmer w-full text-xs !py-3 text-center justify-center font-bold"
                >
                  この点滴について問い合わせる
                </button>
              </div>
            </div>

          </div>

          {/* Collapsible Ingredients & Medical Explanation Card (Uploaded Image Replica) */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[20px] overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-[17px] font-bold text-[#16120F] hover:bg-[#FAF8F5]/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Sparkles className="w-5 h-5 text-[#8E6D42] shrink-0" />
                  <span>主な配合成分と医学的説明を見る</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#827467] transition-transform duration-200 shrink-0 ${isIngredientsOpen ? 'rotate-180 text-[#8E6D42]' : ''}`} />
              </button>

              {isIngredientsOpen && (
                <div className="p-5 sm:p-7 pt-5 border-t border-[#E2D7CA] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Card 1: グルタチオン */}
                    <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 sm:p-5 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#16120F] mb-1.5">
                        グルタチオン
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                        抗酸化作用を持ち、肝機能や身体のコンディション維持をサポートします。
                      </p>
                    </div>

                    {/* Card 2: ビタミンC */}
                    <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 sm:p-5 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#16120F] mb-1.5">
                        ビタミンC
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                        抗酸化作用を持ち、健康維持やコンディション調整をサポートします。
                      </p>
                    </div>

                    {/* Card 3: ビタミンB群 */}
                    <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 sm:p-5 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#16120F] mb-1.5">
                        ビタミンB群
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                        食事からエネルギーを作るために必要な補酵素で、エネルギー代謝を支えます。
                      </p>
                    </div>

                    {/* Card 4: αリポ酸（チオクト酸） */}
                    <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 sm:p-5 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#16120F] mb-1.5">
                        αリポ酸（チオクト酸）
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                        水溶性・脂溶性の両面で働き、細胞のエネルギー代謝をサポートします。
                      </p>
                    </div>

                    {/* Card 5: グリファーゲン（グリチルリチン酸） */}
                    <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 sm:p-5 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#16120F] mb-1.5">
                        グリファーゲン（グリチルリチン酸）
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                        甘草由来成分を含み、過密な業務が続く方の健康維持を支えます。
                      </p>
                    </div>

                    {/* Card 6: マグネシウム */}
                    <div className="bg-white border border-[#E2D7CA] rounded-[12px] p-4.5 sm:p-5 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#16120F] mb-1.5">
                        マグネシウム
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#53483E] leading-relaxed">
                        筋肉や神経の正常な働きを支え、緊張を和らげるミネラルです。
                      </p>
                    </div>

                  </div>

                  <p className="text-[11.5px] text-[#827467] leading-relaxed pt-2 px-0.5">
                    ※成分の配合内容や投与量は、医師が問診・診察を行った上で個人の体調に合わせて調整いたします。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Calculator Bar */}
          <div className="bg-white border border-[#E2D7CA] p-5 sm:p-6 rounded-[14px] shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-[#E2D7CA] pb-3 mb-4">
              <h3 className="font-serif text-base font-bold text-[#16120F] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9E7D52]"></span>
                <span>料金シミュレーター</span>
              </h3>
              <span className="text-[11px] text-[#827467]">出張費を含めた総額が確認できます</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#53483E] mb-1.5">1. 訪問エリア</label>
                <select 
                  value={estimateRegion} 
                  onChange={(e) => setEstimateRegion(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] p-2.5 text-[#16120F] focus:outline-none focus:border-[#9E7D52]"
                >
                  {regionFees.map((r, i) => (
                    <option key={i} value={i}>{r.name} ({r.fee === 0 ? "出張費無料" : `+¥${r.fee.toLocaleString()}`})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#53483E] mb-1.5">2. 点滴メニュー</label>
                <select 
                  value={estimateDripType} 
                  onChange={(e) => setEstimateDripType(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] p-2.5 text-[#16120F] focus:outline-none focus:border-[#9E7D52]"
                >
                  <option value="recovery">プレミアムリカバリー点滴 (初回体験: ¥22,000)</option>
                  <option value="nmn">NMNリバース点滴 (¥49,500〜)</option>
                  <option value="stemcell">幹細胞上清液点滴 (¥99,000〜)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3">
              <input 
                type="checkbox" 
                id="calcOptions" 
                checked={estimateOptions}
                onChange={(e) => setEstimateOptions(e.target.checked)}
                className="w-4 h-4 rounded border-[#E2D7CA] text-[#143836] focus:ring-[#143836]"
              />
              <label htmlFor="calcOptions" className="text-xs font-medium text-[#53483E] cursor-pointer select-none">
                ビタミンブースター追加オプション (+¥3,000)
              </label>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2D7CA] flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-[#827467]">お支払総額（診察代・往診料・税込）</span>
                <span className="font-serif text-2xl font-bold text-[#143836]">¥{calculatedTotal.toLocaleString()}</span>
              </div>
              <a 
                href="#contact-form" 
                className="btn btn--gold btn--shimmer text-xs !py-2.5 !px-5"
              >
                この内容で予約
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 07: 担当医師の紹介 (連続配置 2/3) */}
      <section id="doctor" className="pt-16 pb-20 sm:py-24 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] max-w-sm mx-auto rounded-[16px] overflow-hidden border border-[#E2D7CA] shadow-[0_12px_36px_rgba(22,18,15,0.08)]">
                <img 
                  src={doctorPhoto} 
                  alt="LIF SKIN CLINIC 院長 宇佐美 潤" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-4 border-l-4 border-[#143836] pl-3.5 max-w-sm mx-auto">
                <span className="text-xs text-[#143836] font-bold block">LIF SKIN CLINIC 院長</span>
                <h3 className="font-serif text-2xl font-bold text-[#16120F]">宇佐美 潤</h3>
                <span className="text-xs text-[#827467] leading-relaxed block mt-0.5 font-medium">
                  日本麻酔科学会認定専門医 / 心臓血管麻酔専門医
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left">
                <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                  06 DOCTOR PROFILE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16120F] leading-tight">
                  医師が、直接ご自宅へ伺います。
                </h2>
              </div>
              
              <div className="space-y-3.5 text-[#53483E] text-sm leading-relaxed font-normal">
                <p>
                  はじめまして。LIF SKIN CLINIC 院長の宇佐美潤です。
                  私は大学病院などで約10年間、麻酔科医として勤務したのち、美容医療の世界へ進みました。
                </p>
                <p>
                  麻酔科では、日々の手術の中で無数の静脈確保や全身の循環管理、救急対応を行い、徹底した安全管理の技術を磨いてまいりました。
                  点滴医療は身体に針を通して直接薬剤を届ける医療行為だからこそ、技術と安全への配慮が不可欠です。
                </p>
                <p>
                  「通院の時間が取れない」「人目を気にせずリラックスして受けたい」という方へ、病院と同等水準の安全性とプライベートな寛ぎをご自宅にお届けします。
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer text-xs py-3 px-6 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>医師に直接LINEで相談する</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 shrink-0" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 08: 初回体験の案内 (連続配置 3/3) */}
      <section id="trial" className="pt-16 pb-20 sm:py-24 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[880px] mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto mb-10 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                07 TRIAL OFFER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                まずは一度、ご自宅で体験してみてください。
              </h2>
            </div>
          </div>
 
          {/* Ticket Style Offer Card */}
          <div className="bg-[#FAF7F2] border-2 border-[#E2D7CA] rounded-[20px] shadow-[0_12px_36px_rgba(22,18,15,0.08)] relative overflow-hidden text-center max-w-lg mx-auto">
            <div className="absolute top-0 right-0 bg-[#143836] text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-bl-[8px] uppercase z-10">
              東京都中央区・港区限定
            </div>

            {/* Pricing & CTAs */}
            <div className="p-7 sm:p-10 flex flex-col items-center justify-center text-center">
              
              <h4 className="font-serif text-xl sm:text-2xl font-black text-[#143836] mb-3 pb-1 border-b-2 border-[#8E6D42] tracking-wide inline-block">
                プレミアムリカバリー点滴
              </h4>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#827467] font-medium">通常料金</span>
                <span className="relative inline-block font-serif text-lg font-bold text-[#827467] px-1 select-none">
                  ¥33,000
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="2" y1="88" x2="98" y2="12" stroke="#D9534F" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </div>

              <div className="flex flex-col items-center mb-1">
                <span className="inline-block text-xs font-bold text-white bg-[#143836] px-3 py-1 rounded shadow-sm mb-1.5 tracking-wider">
                  初回特別体験価格
                </span>
                
                <div className="relative inline-flex items-baseline justify-center">
                  <span className="font-serif text-4xl sm:text-5xl font-extrabold !text-[#143836] tracking-tight">
                    ¥22,000
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#827467] whitespace-nowrap ml-2">
                    （税込）
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-[#827467] block mt-1.5 font-medium">
                ※これ以上の追加費用は一切かかりません。
              </span>

              <div className="mt-6 w-full space-y-2.5">
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer w-full text-center justify-center text-[13.5px] sm:text-sm !py-3.5 whitespace-nowrap gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>初回体験をLINEで予約する</span>
                </a>
                <a 
                  href="#contact-form" 
                  className="btn btn--gold btn--shimmer w-full text-center justify-center text-[13.5px] sm:text-sm !py-3.5 whitespace-nowrap gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#7A5723] shrink-0" />
                  <span>WEBフォームから予約する</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          09 | 安全管理・安心して受けるための体制
          =================================================== */}
      <section id="safety" className="pt-16 pb-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-12 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                08 SAFETY & QUALITY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                安心して点滴を受けていただくための体制
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              麻酔科専門医が責任をもって、院内と同等水準の安全管理基準を徹底します。
            </p>
          </div>

          <div className="bg-white border border-[#E2D7CA] rounded-[16px] divide-y sm:divide-y-0 sm:grid sm:grid-cols-2 shadow-sm overflow-hidden">
            
            {/* Pillar 1 */}
            <div className="p-6 sm:p-8 flex items-start gap-4 sm:border-r sm:border-b border-[#E2D7CA]">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 01</span>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  医師による対面問診と適応判断
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  点滴前に体調、既往歴、内服薬、アレルギー歴を詳細に確認し、施術の安全性を医学的に確認します。
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 sm:p-8 flex items-start gap-4 sm:border-b border-[#E2D7CA]">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 02</span>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  点滴中の全身状態確認
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  麻酔科医の知見に基づき、点滴中も体調や循環状態の変化をこまめに確認しながら施術を進めます。
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 sm:p-8 flex items-start gap-4 sm:border-r border-[#E2D7CA]">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 03</span>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  緊急時の迅速な対応体制
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  アレルギー反応や血管痛、急な気分不良が生じた場合にも、医師がその場で迅速に初期医療処置を行います。
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">POINT 04</span>
                <h3 className="font-serif text-base font-bold text-[#16120F]">
                  滅菌器材と衛生管理の徹底
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  使用する針やチューブなどの器材はすべて完全使い捨て（ディスポーザブル）を使用し、衛生面を徹底管理します。
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          10 | 訪問の様子を紹介する動画
          =================================================== */}
      <section className="pt-16 pb-20 sm:py-24 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[960px] mx-auto px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                09 CONCEPT MOVIE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                訪問点滴の様子を動画で見る
              </h2>
            </div>
            <p className="text-[#53483E] text-sm sm:text-base mt-4 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              ご自宅でのリラックスした施術風景や、医師の丁寧な対応の流れをご確認いただけます。
            </p>
          </div>

          {/* Video Container */}
          <div className="bg-white border-2 border-[#E2D7CA] rounded-[18px] overflow-hidden shadow-md p-2 sm:p-4">
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
          11 | ご利用の流れ (動画の直後に配置)
          =================================================== */}
      <section id="flow" className="pt-16 pb-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          
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
              ご予約から点滴完了まで、4つのステップでスムーズに完結します。
            </p>
          </div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-[#E2D7CA] z-0" />
            {/* Mobile connecting line */}
            <div className="absolute left-[28px] top-4 bottom-4 w-[1.5px] bg-[#E2D7CA] lg:hidden z-0" />

            <div className="relative space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6 z-10">
              
              {/* Step 1 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span>01</span>
                  </div>
                </div>
                <div className="space-y-1 pt-1 lg:pt-0">
                  <h3 className="font-serif text-base font-bold text-[#16120F]">
                    ご予約・お問い合わせ
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    LINEまたはWEBフォームより、ご希望の日時と訪問場所をご連絡ください。
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span>02</span>
                  </div>
                </div>
                <div className="space-y-1 pt-1 lg:pt-0">
                  <h3 className="font-serif text-base font-bold text-[#16120F]">
                    事前確認・日程確定
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    体調や既往歴を事前に簡単に確認し、医師の訪問スケジュールを確定します。
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span>03</span>
                  </div>
                </div>
                <div className="space-y-1 pt-1 lg:pt-0">
                  <h3 className="font-serif text-base font-bold text-[#16120F]">
                    ご自宅へ訪問・点滴
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    医師が訪問して対面問診を行い、リラックスした空間で点滴を投与します。
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:text-center lg:gap-3 relative">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border-2 border-[#143836] text-[#143836] flex items-center justify-center font-serif font-bold text-base shadow-sm relative z-10">
                    <span>04</span>
                  </div>
                </div>
                <div className="space-y-1 pt-1 lg:pt-0">
                  <h3 className="font-serif text-base font-bold text-[#16120F]">
                    アフターケア
                  </h3>
                  <p className="text-xs text-[#53483E] leading-relaxed">
                    施術後の注意事項をお伝えします。終了後も気になることがあればLINEで相談可能です。
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
              <span>LINEで空き状況を確認する</span>
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          12 | よくある質問 (FAQ)
          =================================================== */}
      <section id="faq" className="pt-16 pb-20 sm:py-24 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6">
          
          <div className="mb-14 text-left sm:text-center flex sm:justify-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                11 FAQ
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                よくあるご質問
              </h2>
            </div>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div 
                  key={index}
                  className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[10px] overflow-hidden transition-all shadow-2xs"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4.5 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-semibold text-[#16120F] focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#143836] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        Q
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#827467] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#143836]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#53483E] leading-relaxed border-t border-[#E2D7CA]/40 bg-white">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#FAF8F5] text-[#8E6D42] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
          14 | 対応エリア (Service Area)
          =================================================== */}
      <section className="py-14 sm:py-18 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block font-serif">
            12 SERVICE AREA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold">
            往診対応エリア
          </h2>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2D7CA] rounded-full shadow-sm text-sm sm:text-base font-serif font-bold text-[#16120F]">
            <MapPin className="w-4 h-4 text-[#8E6D42]" />
            <span>東京都中央区・港区（出張費無料・完全予約制）</span>
          </div>
          <p className="text-xs text-[#53483E] max-w-lg mx-auto leading-relaxed pt-1">
            千代田区・渋谷区・新宿区（+¥3,000）、その他東京23区内（+¥5,000）もお伺い可能です。エリア外への往診もスケジュール次第で対応いたしますので、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* ===================================================
          15 | 相談・お問い合わせフォーム (Contact & Inquiry)
          =================================================== */}
      <section id="contact-form" className="pt-16 pb-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[780px] mx-auto px-6">
          
          <div className="mb-10 text-left sm:text-center flex flex-col sm:items-center">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                13 CONTACT & RESERVATION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                初回体験の予約・ご相談
              </h2>
            </div>
            <p className="text-xs text-[#827467] mt-3 leading-relaxed text-left sm:text-center max-w-xl pl-4 sm:pl-0">
              タップすると質問内容が自動でフォームにセットされます
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button 
              onClick={() => applyPresetQuestion('自分でも受けられますか？')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-2xs"
            >
              「自分でも受けられますか？」
            </button>
            <button 
              onClick={() => applyPresetQuestion('どの点滴が合っているか相談したい')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-2xs"
            >
              「どんな点滴が合いそう？」
            </button>
            <button 
              onClick={() => applyPresetQuestion('希望日時に訪問可能か知りたい')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-2xs"
            >
              「希望日に訪問できますか？」
            </button>
          </div>

          {contactSubmitted ? (
            <div className="bg-white border-2 border-[#06C755] rounded-[16px] p-8 text-center space-y-4 shadow-md">
              <div className="w-12 h-12 bg-[#06C755]/10 text-[#06C755] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#16120F]">
                お問い合わせを受け付けました
              </h3>
              <p className="text-xs text-[#53483E] leading-relaxed max-w-md mx-auto">
                内容を確認の上、担当医師より速やかにご連絡を差し上げます。
                お急ぎの場合は、公式LINEよりご連絡いただければ最短即時でお答え可能です。
              </p>
              <div className="pt-2">
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer text-xs py-3 px-6 inline-flex"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755]" />
                  <span>LINEでやり取りする</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-8 shadow-sm space-y-4">
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
                  ご相談内容・ご希望メニュー・訪問先エリア
                </label>
                <textarea 
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="例：初回体験を希望します。来週水曜の午前中は空いていますか？（訪問先：中央区勝どき）"
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] focus:outline-none focus:border-[#9E7D52]"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="btn btn--gold btn--shimmer w-full text-sm py-3.5 whitespace-nowrap font-bold"
                >
                  <Send className="w-4 h-4 text-[#7A5723] shrink-0" />
                  <span>初回体験の予約・相談を送信する</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#827467] leading-relaxed">
                ※ご入力いただいた個人情報は、訪問診療のご連絡のみに使用し、第三者に提供することはございません。
              </p>
            </form>
          )}

        </div>
      </section>

      {/* ===================================================
          16 | クリニック概要 ＆ 自由診療に関する法的掲示
          =================================================== */}
      <footer className="bg-[#382E26] text-[#FAF8F5] py-14 border-t border-[#4E4137]">
        <div className="max-w-[1160px] mx-auto px-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider block text-white mb-2">
                LIF SKIN CLINIC
              </span>
              <p className="text-xs text-[#DFCBA9] tracking-widest font-semibold mb-3">
                院長 宇佐美 潤（麻酔科専門医 / 心臓血管麻酔専門医）
              </p>
              <p className="text-xs text-white/70 leading-relaxed max-w-md">
                東京都中央区勝どき6-3-2<br />
                ※本訪問点滴サービスは、医師による完全予約制の往診診療です。事前のご予約・ご相談は公式LINEまたは当サイトより承っております。
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold !text-[#DFCBA9] tracking-wider">
                【自由診療に関する法的掲示】
              </h4>
              <p className="leading-relaxed text-white/80">
                ・本治療は公的医療保険が適用されない自由診療です。<br />
                ・点滴による効果・実感には個人差があります。<br />
                ・主な副作用・リスク：血管痛、内出血、一時的な頭痛、低血糖症状、アレルギー反応等。異常を感じた場合は直ちに投与を中断・調整し、医師が適切な医学処置を行います。
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} LIF SKIN CLINIC. All rights reserved.
          </div>

        </div>
      </footer>

      {/* ===================================================
          17 | モバイル固定フッターCTA (Frost Glass Style)
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
          <span className="frost-btn-text">初回簡単WEB予約</span>
        </a>
      </div>

    </div>
  )
}
