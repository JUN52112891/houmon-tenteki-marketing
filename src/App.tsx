import React, { useState } from 'react'
import { 
  Check, 
  ChevronDown, 
  X, 
  Send,
  Menu,
  Sparkles,
  MessageCircle,
  Calendar,
  ArrowRight,
  MapPin,
  Stethoscope,
  Laptop,
  BookOpen,
  Coffee,
  Home,
  CheckCircle2
} from 'lucide-react'

// Existing authentic photos
import doctorPhoto from './assets/images/宣材写真5.jpg'
import scenePhoto from './assets/images/3人の点滴風景.png'
import concernDeskWork from './assets/images/仕事のパフォーマンスを上げたい.png'
import concernPrivateHome from './assets/images/hero_lounge_armchair_1790513053114.jpg'

// Newly generated high-fidelity matching assets
import heroHomeDrip from './assets/images/hero_home_drip_1790731796432.jpg'
import sceneLaptopDrip from './assets/images/scene_laptop_drip_1790731808624.jpg'
import sceneReadingDrip from './assets/images/scene_reading_drip_1790731821488.jpg'
import concernTiredEvening from './assets/images/concern_tired_evening_1790731832572.jpg'
import concernWeekendClock from './assets/images/concern_weekend_clock_1790731843843.jpg'

interface FAQItem {
  question: string
  answer: string
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false)

  // Pricing calculator states
  const [estimateRegion, setEstimateRegion] = useState<number>(0)
  const [estimateDripType, setEstimateDripType] = useState<string>('trial')

  // Contact form state
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const regionFees = [
    { name: '中央区・港区', fee: 0, desc: '主要対応エリア・出張費無料' },
    { name: '千代田区・渋谷区・新宿区', fee: 3000, desc: '準主要エリア・出張費 ¥3,000' },
    { name: 'その他 東京23区内', fee: 5000, desc: '周辺エリア・出張費一律 ¥5,000' }
  ]

  const dripPrices: Record<string, { name: string, price: number }> = {
    trial: { name: '初回体験プラン（疲労回復点滴）', price: 22000 },
    recovery: { name: 'プレミアムリカバリー点滴（通常）', price: 33000 },
    nmn: { name: 'NMNリバース点滴（エイジングケア）', price: 49500 },
    stemcell: { name: '幹細胞上清液点滴（最高峰ケア）', price: 99000 }
  }

  const basePrice = dripPrices[estimateDripType]?.price || 22000
  const regionFee = regionFees[estimateRegion]?.fee || 0
  const calculatedTotal = basePrice + regionFee

  const faqs: FAQItem[] = [
    {
      question: "点滴にはどのくらい時間がかかりますか？",
      answer: "医師の問診・準備を含め、全体で約45〜60分程度です。点滴終了後はそのままご自宅でお休みいただけます。"
    },
    {
      question: "点滴中に仕事をしても大丈夫ですか？",
      answer: "はい、問題ございません。片腕は安静にしていただきますが、ノートPCでの作業や通話、読書など自由にお過ごしいただけます。"
    },
    {
      question: "家族が自宅にいても大丈夫ですか？",
      answer: "問題ございません。ご家族やご同居の方がいらっしゃるリビングでも施術可能です。特別な隔離空間は不要です。"
    },
    {
      question: "どのくらいのスペースが必要ですか？",
      answer: "ソファや椅子が1脚と、医師が点滴器具を置くための小さなスペース（テーブルやサイドテーブル）があれば十分です。"
    },
    {
      question: "ホテルにも来てもらえますか？",
      answer: "はい。港区・中央区をはじめとする東京都内の宿泊施設やプライベートオフィスへの訪問も承っております。ご予約時にご相談ください。"
    },
    {
      question: "当日予約はできますか？",
      answer: "医師のスケジュールに空きがあれば当日対応も可能です。LINEにてご希望のお時間とお伺い先をお気軽にお問い合わせください。"
    },
    {
      question: "女性一人の自宅でも利用できますか？",
      answer: "はい、多くの女性経営者・役員の方にもご利用いただいております。事前にご不安な点がございましたらLINEでいつでもご相談いただけます。"
    },
    {
      question: "対応エリアはどこですか？",
      answer: "港区・中央区を中心に、千代田区・渋谷区・新宿区など都内各所へ伺っております。近隣エリアも柔軟に対応可能です。"
    },
    {
      question: "自分に合う点滴が分かりません。",
      answer: "事前のLINE相談や当日の問診にて、体調やお悩みを丁寧にお伺いした上で最適な点滴をご案内します。まずは「初回体験プラン（疲労回復点滴）」をおすすめしております。"
    },
    {
      question: "副作用やリスクはありますか？",
      answer: "針を刺した箇所の軽い内出血や一時的な血管痛、体質による低血糖症状などが稀に起こる場合があります。事前にアレルギーや体調を医師が診察し、安全を最優先に施術いたします。"
    }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName.trim() || !contactPhone.trim()) {
      return
    }
    setContactSubmitted(true)
  }

  const applyPresetQuestion = (preset: string) => {
    setContactMessage(`【ご質問】「${preset}」について詳しく知りたいです。\nご希望日時・場所など：`)
    const formEl = document.getElementById('contact-form')
    formEl?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#221D18] font-sans antialiased selection:bg-[#143836] selection:text-white pb-20 md:pb-0">
      
      {/* ===================================================
          Header & Navigation (One-Row Clean Top Bar Contract)
          =================================================== */}
      <header className="site-header">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-6 h-[68px] lg:h-[72px] flex items-center justify-between">
          
          {/* Brand Wordmark (Single clean element) */}
          <a href="#" className="flex flex-col">
            <span className="font-serif text-lg sm:text-[21px] tracking-[0.08em] font-bold text-[#16120F]">
              LIF SKIN CLINIC
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.14em] text-[#8E6D42] font-medium">
              VISITING IV THERAPY ｜ 訪問点滴
            </span>
          </a>

          {/* Nav links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#53483E]">
            <a href="#comparison" className="hover:text-[#143836] transition-colors">通院との違い</a>
            <a href="#life-value" className="hover:text-[#143836] transition-colors">過ごし方</a>
            <a href="#merits" className="hover:text-[#143836] transition-colors">3つの特徴</a>
            <a href="#doctor" className="hover:text-[#143836] transition-colors">医師紹介</a>
            <a href="#menu" className="hover:text-[#143836] transition-colors">点滴メニュー</a>
            <a href="#flow" className="hover:text-[#143836] transition-colors">利用の流れ</a>
            <a href="#faq" className="hover:text-[#143836] transition-colors">よくある質問</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-header-line"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>LINE相談</span>
            </a>
            <a 
              href="#contact-form" 
              className="hidden sm:inline-flex btn-header-reserve"
            >
              <Calendar className="w-4 h-4 text-[#7A5723] shrink-0" />
              <span>予約フォーム</span>
            </a>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#53483E] hover:text-[#16120F] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E2D7CA] px-6 py-5 space-y-3.5 shadow-xl">
            <a href="#comparison" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">通院との違い</a>
            <a href="#life-value" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">点滴中の過ごし方</a>
            <a href="#merits" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">訪問点滴のメリット</a>
            <a href="#doctor" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">医師紹介（宇佐美 潤）</a>
            <a href="#trial-cta" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#143836] py-1">初回体験 22,000円</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">目的別点滴メニュー</a>
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
          1. ファーストビュー (Hero / First View)
          =================================================== */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        {/* Ambient background visual */}
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-[380px] sm:h-[460px] lg:h-full pointer-events-none z-0 overflow-hidden">
          <img 
            src={heroHomeDrip} 
            alt="都心の落ち着いたリビングで医師が訪問点滴を行う様子" 
            className="w-full h-full object-cover object-center opacity-45 sm:opacity-35 lg:opacity-35 filter contrast-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-[#FAF8F5] lg:bg-gradient-to-r lg:from-[#FAF8F5] lg:via-[#FAF8F5]/95 lg:to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Area & Service Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143836] text-[#FAF8F5] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#DFCBA9] shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.06em]">
                港区・中央区を中心に対応｜医師が訪問｜完全予約制
              </span>
            </div>

            {/* Main Catchcopy */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[48px] text-[#16120F] leading-[1.3] font-bold tracking-[0.02em]">
              疲れた日に、<br />
              クリニックへ行く必要はありません。
            </h1>

            {/* Sub Catchcopy */}
            <p className="font-serif text-base sm:text-xl text-[#3D332B] font-semibold leading-relaxed">
              医師がご自宅へ。<br />
              移動も、待ち時間もなく、<br className="sm:hidden" />
              いつもの空間で受ける訪問点滴。
            </p>

            <p className="text-[#53483E] text-sm sm:text-base leading-relaxed max-w-xl">
              「忙しくて通院する時間がない」「疲れていても仕事を休めない」多忙なエグゼクティブや専門職の方へ。ご自宅でリラックスしたまま、医師による丁寧な問診と点滴ケアをご提供します。
            </p>

            {/* Price Pill */}
            <div className="inline-flex items-center gap-3.5 py-3 px-4 sm:px-5 bg-white border border-[#E2D7CA] border-l-4 border-l-[#143836] rounded-[8px] shadow-sm">
              <span className="text-xs font-bold text-[#143836] tracking-wider">初回体験</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#143836]">¥22,000</span>
              <span className="text-xs text-[#827467]">（税込・往診料・診察代すべて込）</span>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn--line btn--shimmer text-base sm:text-[16.5px] px-6 py-4 shadow-md gap-2.5 justify-center"
              >
                <MessageCircle className="w-5 h-5 text-[#06C755] shrink-0" />
                <span>初回体験についてLINEで相談する</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </a>
              <a 
                href="#comparison" 
                className="btn btn--gold text-sm sm:text-base px-6 py-4 justify-center"
              >
                <span>サービス内容を見る</span>
              </a>
            </div>

            {/* Trust bullet indicators */}
            <div className="pt-4 border-t border-[#E2D7CA] flex flex-wrap gap-4 text-xs text-[#53483E] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8E6D42]" />
                <span>医師（麻酔科医）が直接往診</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8E6D42]" />
                <span>移動・待ち時間ゼロ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8E6D42]" />
                <span>明朗会計・追加料金なし</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[20px] overflow-hidden border border-[#E2D7CA] shadow-[0_16px_40px_rgba(22,18,15,0.08)] bg-white">
              <img 
                src={heroHomeDrip} 
                alt="自宅のリビングでリラックスしながら医師の点滴ケアを受けるイメージ" 
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-5 sm:p-6 bg-white space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8E6D42] font-semibold">
                  <span>プライベートコンシェルジュ医療</span>
                  <span>麻酔科専門医が担当</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#16120F]">
                  ご自宅を、最上級のウェルネス空間に。
                </h3>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  点滴のために予定を空けたり身支度をする必要はありません。いつもの日常の延長で、最高峰のコンディショニングをお届けします。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          2. 「こんな時間を無駄にしていませんか？」悩み訴求
          =================================================== */}
      <section className="pt-14 pb-16 sm:py-20 bg-[#F3ECE4]/70 border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              CONCERNS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              こんな時間を、もったいないと感じていませんか？
            </h2>
            <p className="text-sm text-[#53483E] mt-3 leading-relaxed">
              通院にともなう移動や待ち時間は、多忙なエグゼクティブにとって大きな負担です。
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1100px] mx-auto">
            
            {/* Item 1 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={concernTiredEvening} 
                  alt="夜のオフィスで仕事を終え、疲れた表情でPCを閉じる男性" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <span className="text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif block">
                  CASE 01
                </span>
                <p className="font-serif text-sm sm:text-[15px] font-bold text-[#16120F] leading-snug">
                  仕事が終わる頃には、<br />
                  クリニックへ行く気力が残っていない。
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={concernWeekendClock} 
                  alt="休日、時計を見ながら外出準備をしている男性" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <span className="text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif block">
                  CASE 02
                </span>
                <p className="font-serif text-sm sm:text-[15px] font-bold text-[#16120F] leading-snug">
                  せっかくの休日を、<br />
                  通院や待ち時間で潰したくない。
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={concernDeskWork} 
                  alt="忙しい仕事の合間にデスクでコンディションを整えたい男性" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <span className="text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif block">
                  CASE 03
                </span>
                <p className="font-serif text-sm sm:text-[15px] font-bold text-[#16120F] leading-snug">
                  忙しくても、<br />
                  身体のコンディションは整えておきたい。
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={concernPrivateHome} 
                  alt="自宅のリビングでリラックスしてケアを受けたい" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <span className="text-[11px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif block">
                  CASE 04
                </span>
                <p className="font-serif text-sm sm:text-[15px] font-bold text-[#16120F] leading-snug">
                  人目を気にせず、<br />
                  自宅でゆっくりケアを受けたい。
                </p>
              </div>
            </div>

          </div>

          {/* Subtext Bridge */}
          <div className="mt-10 sm:mt-12 text-center max-w-2xl mx-auto bg-white border border-[#E2D7CA] rounded-[12px] p-6 shadow-sm">
            <p className="font-serif text-base sm:text-xl font-bold text-[#143836] leading-relaxed">
              その“通院するひと手間”までなくすために、<br className="hidden sm:inline" />
              医師がご自宅へ伺います。
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================
          3. 「通院 vs 訪問点滴」の比較セクション
          =================================================== */}
      <section id="comparison" className="pt-14 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              TIME VALUE COMPARISON
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              同じ点滴でも、“使う時間”は大きく変わります。
            </h2>
            <p className="text-sm text-[#53483E] mt-3 leading-relaxed">
              一般的なクリニック通院と、医師が直接訪れる訪問点滴のプロセス比較です。
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Left: 一般的な通院 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[20px] p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#E2D7CA] pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#827467] font-semibold block">従来のスタイル</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#53483E]">一般的な通院</h3>
                </div>
                <span className="text-xs bg-[#E9E0D4] text-[#53483E] font-bold px-3 py-1 rounded-full">
                  約 3〜4時間 拘束
                </span>
              </div>

              {/* Vertical Step Flow */}
              <div className="space-y-2.5">
                {[
                  '自宅を出る（身支度）',
                  'クリニックへの移動（往路）',
                  '受付・問診票の記入',
                  '待合室での待ち時間',
                  '医師の診察',
                  '点滴の施術（約30〜40分）',
                  '会計・次回の予約待ち',
                  '自宅への帰宅（復路）'
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#E2D7CA] text-[#6B5E52] text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-[#53483E] font-medium">{step}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-white border border-[#E2D7CA] rounded-[8px] text-xs text-[#827467] leading-relaxed">
                ※移動時間や待合室での待機など、「点滴そのもの以外」の時間に多くのエネルギーを消費してしまいます。
              </div>
            </div>

            {/* Right: 訪問点滴 (Highlighted) */}
            <div className="bg-gradient-to-b from-[#FAF7F2] to-white border-2 border-[#143836] rounded-[20px] p-6 sm:p-8 space-y-6 shadow-md relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#143836] text-white text-[11px] font-bold tracking-wider px-3.5 py-1 rounded-full">
                スマートな時間活用
              </div>

              <div className="border-b border-[#E2D7CA] pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8E6D42] font-semibold block">当院のサービス</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143836]">当院の訪問点滴</h3>
                </div>
                <span className="text-xs bg-[#143836] text-[#FAF8F5] font-bold px-3 py-1 rounded-full">
                  点滴時間のみ（約45〜60分）
                </span>
              </div>

              {/* Vertical Step Flow */}
              <div className="space-y-4 pt-1">
                {[
                  { title: '医師がご自宅へ到着', desc: '外出の準備も、往復の移動も一切不要です。' },
                  { title: '医師による対面診察', desc: '体調やご要望を確認し、最適な点滴をご提案します。' },
                  { title: 'いつもの空間で点滴', desc: 'PC作業、読書、歓談など自由にお過ごしいただけます。' },
                  { title: '終了・そのまま休息', desc: '点滴終了後は、そのまま自宅でリラックスできます。' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-[#143836] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-[#16120F]">{item.title}</div>
                      <p className="text-xs text-[#53483E] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-[#FAF8F5] border border-[#DFCBA9] rounded-[8px] text-xs text-[#143836] font-medium leading-relaxed">
                ✔ ノーメイクや部屋着のまま、リラックスした空間でお待ちいただけます。
              </div>
            </div>

          </div>

          {/* Bottom Statement */}
          <div className="mt-12 text-center">
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143836] tracking-wide">
              必要なのは、“点滴を受ける時間”だけ。
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================
          4. 「点滴のために予定を空ける必要はありません」生活価値セクション
          =================================================== */}
      <section id="life-value" className="pt-14 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              LIFE VALUE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              点滴のために、予定を空ける必要はありません。
            </h2>
            <p className="text-sm sm:text-base text-[#53483E] mt-4 leading-relaxed font-medium">
              点滴中も、仕事をしたり、本を読んだり、ご家族と過ごしたり。<br className="hidden sm:inline" />
              いつもの時間を、そのままお使いいただけます。
            </p>
          </div>

          {/* 4 Usage Scenes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1120px] mx-auto">
            
            {/* Scene A */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={sceneLaptopDrip} 
                  alt="高級マンションのリビングでノートPCを使いながら点滴を受ける男性" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#143836]">
                  <Laptop className="w-4 h-4 text-[#8E6D42]" />
                  <h3 className="font-serif text-base font-bold text-[#16120F]">仕事をしながら</h3>
                </div>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  PC作業やオンライン通話、メールチェックも中断することなく、仕事の時間を活かしたままケアを受けられます。
                </p>
              </div>
            </div>

            {/* Scene B */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={sceneReadingDrip} 
                  alt="ソファで本を読みながら点滴を受けている男性" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#143836]">
                  <BookOpen className="w-4 h-4 text-[#8E6D42]" />
                  <h3 className="font-serif text-base font-bold text-[#16120F]">読書をしながら</h3>
                </div>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  お気に入りのソファで静かに本を読みながら、日常の喧騒から離れたプライベートな休息時間を過ごせます。
                </p>
              </div>
            </div>

            {/* Scene C */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={scenePhoto} 
                  alt="自宅のリビングでリラックスして点滴を受ける風景" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#143836]">
                  <Home className="w-4 h-4 text-[#8E6D42]" />
                  <h3 className="font-serif text-base font-bold text-[#16120F]">家族と過ごしながら</h3>
                </div>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  ご家族やパートナーと同じ空間でくつろぎながら点滴を受けることができます。ご夫婦やご友人での同席も可能です。
                </p>
              </div>
            </div>

            {/* Scene D */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={heroHomeDrip} 
                  alt="夜、自宅でくつろぎながら点滴を受ける" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#143836]">
                  <Coffee className="w-4 h-4 text-[#8E6D42]" />
                  <h3 className="font-serif text-base font-bold text-[#16120F]">夜、自宅でくつろぎながら</h3>
                </div>
                <p className="text-xs text-[#53483E] leading-relaxed">
                  一日の激務を終えた夜、ご自宅で点滴を受け、施術終了後はそのまま就寝。翌朝スッキリと目覚められます。
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          5. 訪問点滴の3つのメリット
          =================================================== */}
      <section id="merits" className="pt-14 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              MERITS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              訪問点滴の3つのメリット
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Merit 01 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 space-y-3 shadow-sm">
              <span className="font-serif text-2xl font-bold text-[#8E6D42] block">01</span>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                移動・待ち時間をなくせる
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                ご自宅へ医師が伺うため、<br />
                通院にかかる時間を減らせます。
              </p>
            </div>

            {/* Merit 02 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 space-y-3 shadow-sm">
              <span className="font-serif text-2xl font-bold text-[#8E6D42] block">02</span>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                自宅だから、気を遣わない
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                人目を気にせず、<br />
                いつもの空間でゆっくりお過ごしいただけます。
              </p>
            </div>

            {/* Merit 03 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 space-y-3 shadow-sm">
              <span className="font-serif text-2xl font-bold text-[#8E6D42] block">03</span>
              <h3 className="font-serif text-lg font-bold text-[#16120F]">
                医師が診察してから施術
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                体調を確認したうえで、<br />
                適切な点滴内容をご提案します。
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          6. 医師紹介 (Moved Forward)
          =================================================== */}
      <section id="doctor" className="pt-14 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Doctor Portrait Photo */}
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] max-w-[340px] mx-auto rounded-[16px] overflow-hidden border border-[#E2D7CA] shadow-md bg-white">
                <img 
                  src={doctorPhoto} 
                  alt="宇佐美 潤 医師／LIF SKIN CLINIC 院長" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Doctor Intro Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="border-l-2 border-[#143836] pl-4 py-0.5">
                <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1 font-serif">
                  DOCTOR PROFILE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                  医師が、直接ご自宅へ伺います。
                </h2>
              </div>

              <div>
                <p className="text-xs font-bold text-[#8E6D42] tracking-wider mb-1">
                  医師／LIF SKIN CLINIC 院長
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F]">
                  宇佐美 潤
                </h3>
              </div>

              <div className="text-sm sm:text-base text-[#53483E] leading-relaxed space-y-3 font-normal">
                <p>
                  麻酔科領域で約15年間、周術期の全身管理に従事。
                </p>
                <p>
                  現在は麻布十番で美容医療にも携わっています。
                </p>
                <p>
                  忙しい方にも、医療をもっと身近に使っていただきたい。<br />
                  そんな思いから、訪問での医療サービスを行っています。
                </p>
              </div>

              <div className="pt-2 text-xs text-[#827467] space-y-1">
                <p>・日本麻酔科学会認定専門医 / 心臓血管麻酔専門医</p>
                <p>・医学的見地から安全性・衛生管理を徹底しております</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          7. 初回体験22,000円のCTA (Directly after Doctor Intro)
          =================================================== */}
      <section id="trial-cta" className="py-14 sm:py-20 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[820px] mx-auto px-5 sm:px-6 text-center space-y-6">
          
          <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block font-serif">
            FIRST EXPERIENCE OFFER
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
            まずは一度、ご自宅で体験してみてください。
          </h2>

          <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-8 max-w-xl mx-auto shadow-sm space-y-4 text-center">
            <div className="text-xs font-bold text-[#8E6D42] tracking-wider uppercase">
              内容：訪問・診察・疲労回復点滴
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#143836]">
                初回体験 22,000円
              </span>
              <span className="text-xs sm:text-sm text-[#827467]">（税込）</span>
            </div>
            <p className="text-xs text-[#827467]">
              ※往診料・初診料・材料費すべて含まれております。追加料金は発生しません。
            </p>
            <div className="pt-2">
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn--line btn--shimmer w-full sm:w-auto px-8 py-4 text-base shadow-md inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-[#06C755] shrink-0" />
                <span>LINEで初回体験について相談する</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </a>
            </div>
            <p className="text-[11px] sm:text-xs text-[#827467] pt-1">
              対応エリア・空き状況の確認だけでもお気軽にご相談ください。
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================
          8. 悩み・目的から選べる点滴メニュー
          =================================================== */}
      <section id="menu" className="pt-14 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              MENU SELECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              悩み・目的から選べる点滴メニュー
            </h2>
            <p className="text-sm text-[#53483E] mt-3 leading-relaxed">
              「今の自分の身体に何が必要か」でお選びいただけます。診察時に医師と相談しながら決めることも可能です。
            </p>
          </div>

          {/* 3 Concern-focused Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Card 1: 疲労回復 (Highlight / おすすめ) */}
            <div className="bg-[#FAF7F2] border-2 border-[#143836] rounded-[16px] p-6 sm:p-7 flex flex-col justify-between shadow-md relative">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#143836] text-white text-[10px] font-bold tracking-wider px-3 py-0.5 rounded-full">
                おすすめ・人気No.1
              </div>
              <div className="space-y-4">
                <div className="border-b border-[#DFCBA9]/70 pb-3">
                  <span className="text-xs text-[#8E6D42] font-bold block mb-1">
                    「今日は、とにかく疲れている」
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                    疲労回復カクテル
                  </h3>
                  <span className="text-[11px] text-[#827467]">（プレミアムリカバリー点滴）</span>
                </div>
                <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                  蓄積した疲労をリフレッシュし、身体本来の活力を取り戻すためのブレンド。過密スケジュールを乗り切るビジネスパーソンに最も選ばれています。
                </p>
                <div className="p-3 bg-white rounded-[8px] border border-[#E2D7CA] text-xs text-[#53483E] space-y-1">
                  <div className="font-bold text-[#143836]">主なサポート：</div>
                  <p>疲労時のコンディション維持、代謝サポート、翌朝のすっきり感</p>
                </div>
              </div>
              <div className="pt-6 border-t border-[#DFCBA9]/70 mt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#827467]">初回体験料金</span>
                  <span className="font-serif text-2xl font-bold text-[#143836]">¥22,000</span>
                </div>
                <span className="text-[11px] text-[#827467] block text-right">（通常 ¥33,000 / 税込）</span>
              </div>
            </div>

            {/* Card 2: 美容・白玉 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="border-b border-[#E2D7CA] pb-3">
                  <span className="text-xs text-[#8E6D42] font-bold block mb-1">
                    「肌も身体も整えたい」
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                    美容・白玉系点滴
                  </h3>
                  <span className="text-[11px] text-[#827467]">（高濃度ビタミンC＆グルタチオン）</span>
                </div>
                <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                  紫外線や不規則な生活による肌のくすみ・透明感の低下が気になる方へ。抗酸化成分を身体の内側から直接届け、みずみずしい透明感をサポートします。
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA] text-xs text-[#53483E] space-y-1">
                  <div className="font-bold text-[#143836]">主なサポート：</div>
                  <p>透明感の維持、酸化ストレスケア、肌のコンディション調整</p>
                </div>
              </div>
              <div className="pt-6 border-t border-[#E2D7CA] mt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#827467]">料金（税込）</span>
                  <span className="font-serif text-2xl font-bold text-[#16120F]">¥33,000</span>
                </div>
                <span className="text-[11px] text-[#827467] block text-right">（往診料・診察代込）</span>
              </div>
            </div>

            {/* Card 3: プレミアム系 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="border-b border-[#E2D7CA] pb-3">
                  <span className="text-xs text-[#8E6D42] font-bold block mb-1">
                    「忙しい時期のコンディション管理」
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                    プレミアム系メニュー
                  </h3>
                  <span className="text-[11px] text-[#827467]">（NMN点滴・幹細胞上清液点滴）</span>
                </div>
                <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                  長寿医療や最先端再生医療領域で注目される成分を贅沢に配合。年齢とともに低下しがちな集中力や持久力を根本からケアしたいエグゼクティブ向けです。
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA] text-xs text-[#53483E] space-y-1">
                  <div className="font-bold text-[#143836]">主なサポート：</div>
                  <p>エイジングケア、思考力・活力の維持、根本的な全身メンテナンス</p>
                </div>
              </div>
              <div className="pt-6 border-t border-[#E2D7CA] mt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#827467]">料金（税込）</span>
                  <span className="font-serif text-2xl font-bold text-[#16120F]">¥49,500〜</span>
                </div>
                <span className="text-[11px] text-[#827467] block text-right">（NMN / 幹細胞上清液）</span>
              </div>
            </div>

          </div>

          {/* Accordion: 主な配合成分を見る */}
          <div className="max-w-[900px] mx-auto border border-[#E2D7CA] rounded-[12px] bg-[#FAF8F5] overflow-hidden">
            <button 
              onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#F3ECE4]/60 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8E6D42]" />
                <span className="font-serif text-sm sm:text-base font-bold text-[#16120F]">
                  主な配合成分と医学的説明を見る
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[#827467] transition-transform duration-200 ${isIngredientsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isIngredientsOpen && (
              <div className="p-5 sm:p-6 bg-white border-t border-[#E2D7CA] space-y-4 text-xs sm:text-sm text-[#53483E]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-3.5 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">グルタチオン</p>
                    <p className="text-xs text-[#53483E] leading-relaxed">
                      抗酸化作用を持ち、肝機能や身体のコンディション維持をサポートします。
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">ビタミンC</p>
                    <p className="text-xs text-[#53483E] leading-relaxed">
                      抗酸化作用を持ち、健康維持をサポートします。
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">ビタミンB群</p>
                    <p className="text-xs text-[#53483E] leading-relaxed">
                      食事からエネルギーを作るために必要な栄養素で、エネルギー代謝を支えます。
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">αリポ酸（チオクト酸）</p>
                    <p className="text-xs text-[#53483E] leading-relaxed">
                      抗酸化作用を持ち、エネルギー代謝をサポートします。
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">グリファーゲン（グリチルリチン酸）</p>
                    <p className="text-xs text-[#53483E] leading-relaxed">
                      甘草由来成分を含み、肝機能や身体のコンディションをサポートします。
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#FAF8F5] rounded-[8px] border border-[#E2D7CA]/60">
                    <p className="font-bold text-[#16120F] mb-1">マグネシウム</p>
                    <p className="text-xs text-[#53483E] leading-relaxed">
                      筋肉や神経の正常な働きを支えるミネラルです。
                    </p>
                  </div>

                </div>
                <p className="text-[11px] text-[#827467] pt-2">
                  ※成分の配合内容や投与量は、医師が問診・診察を行った上で個人の体調に合わせて調整いたします。
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ===================================================
          9. 料金 (Pricing)
          =================================================== */}
      <section id="pricing" className="pt-14 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              PRICE LIST
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              明確な料金体系
            </h2>
            <p className="text-sm text-[#53483E] mt-3 leading-relaxed">
              医師の訪問料・診察料・点滴材料費を含めた明朗会計です。不当な追加請求は一切ございません。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Price Card 1: 初回体験 (Only this one is highlighted) */}
            <div className="bg-white border-2 border-[#143836] rounded-[16px] p-6 sm:p-7 shadow-md relative flex flex-col justify-between">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#143836] text-white text-[11px] font-bold tracking-wider px-3.5 py-1 rounded-full">
                初めての方限定
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#8E6D42] tracking-wider uppercase">TRIAL PLAN</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                  初回体験プラン（疲労回復点滴）
                </h3>
                <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                  医師の問診・訪問料・疲労回復点滴がすべて含まれた特別体験プラン。まずは一度、自宅で受ける心地よさをお試しください。
                </p>
              </div>
              <div className="pt-6 border-t border-[#E2D7CA] mt-6 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#827467] block">通常 ¥33,000 →</span>
                  <span className="font-serif text-3xl font-extrabold text-[#143836]">¥22,000</span>
                  <span className="text-xs text-[#827467] ml-1">（税込）</span>
                </div>
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer text-xs py-2.5 px-4"
                >
                  LINEで予約
                </a>
              </div>
            </div>

            {/* Price Card 2: プレミアムリカバリー点滴 (通常) */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#827467] tracking-wider uppercase">STANDARD</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                  プレミアムリカバリー点滴（通常）
                </h3>
                <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                  2回目以降の方の定番メニュー。蓄積疲労のケアと全身のコンディショニングを定期的にサポートします。
                </p>
              </div>
              <div className="pt-6 border-t border-[#E2D7CA] mt-6 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#827467] block">往診料・診察代込</span>
                  <span className="font-serif text-3xl font-bold text-[#16120F]">¥33,000</span>
                  <span className="text-xs text-[#827467] ml-1">（税込）</span>
                </div>
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--gold text-xs py-2.5 px-4"
                >
                  相談する
                </a>
              </div>
            </div>

            {/* Price Card 3: NMNリバース点滴 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#827467] tracking-wider uppercase">ANTI-AGING</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                  NMNリバース点滴
                </h3>
                <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                  サーチュイン遺伝子（長寿遺伝子）の活性化と細胞内エネルギー補給。若々しさと集中力の維持に。
                </p>
              </div>
              <div className="pt-6 border-t border-[#E2D7CA] mt-6 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#827467] block">往診料・診察代込</span>
                  <span className="font-serif text-3xl font-bold text-[#16120F]">¥49,500〜</span>
                  <span className="text-xs text-[#827467] ml-1">（税込）</span>
                </div>
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--gold text-xs py-2.5 px-4"
                >
                  相談する
                </a>
              </div>
            </div>

            {/* Price Card 4: 幹細胞上清液点滴 */}
            <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#827467] tracking-wider uppercase">REGENERATIVE</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16120F]">
                  幹細胞上清液点滴
                </h3>
                <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                  高純度エクソソーム・サイトカインを含む最高峰の再生医療由来エイジングケア。
                </p>
              </div>
              <div className="pt-6 border-t border-[#E2D7CA] mt-6 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#827467] block">往診料・診察代込</span>
                  <span className="font-serif text-3xl font-bold text-[#16120F]">¥99,000〜</span>
                  <span className="text-xs text-[#827467] ml-1">（税込）</span>
                </div>
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--gold text-xs py-2.5 px-4"
                >
                  相談する
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Fee Estimator */}
          <div className="mt-10 bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-8 max-w-2xl mx-auto shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2D7CA] pb-3">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#16120F] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8E6D42]"></span>
                <span>料金シミュレーション（往診料・診察代込）</span>
              </h3>
              <span className="text-[10px] font-bold text-[#8E6D42] tracking-wider uppercase font-serif">
                SIMULATOR
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#53483E] mb-1.5">
                  1. 訪問地域（出張費）
                </label>
                <select
                  value={estimateRegion}
                  onChange={(e) => setEstimateRegion(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[8px] focus:outline-none focus:border-[#8E6D42]"
                >
                  {regionFees.map((r, i) => (
                    <option key={i} value={i}>
                      {r.name} ({r.fee === 0 ? '出張費無料' : `+¥${r.fee.toLocaleString()}`})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#827467] mt-1">※ {regionFees[estimateRegion].desc}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#53483E] mb-1.5">
                  2. 点滴メニュー
                </label>
                <select
                  value={estimateDripType}
                  onChange={(e) => setEstimateDripType(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[8px] focus:outline-none focus:border-[#8E6D42]"
                >
                  <option value="trial">初回体験プラン (¥22,000)</option>
                  <option value="recovery">プレミアムリカバリー点滴 通常 (¥33,000)</option>
                  <option value="nmn">NMNリバース点滴 (¥49,500〜)</option>
                  <option value="stemcell">幹細胞上清液点滴 (¥99,000〜)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2D7CA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-[#827467] block">お支払予定総額（税込・往診料・診察代込）</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#143836]">
                  ¥{calculatedTotal.toLocaleString()}
                </span>
              </div>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--line btn--shimmer text-xs py-2.5 px-5 self-start sm:self-auto"
              >
                この内容でLINE相談
              </a>
            </div>
          </div>

          {/* Transparent Area Policy Note */}
          <div className="mt-8 text-center text-xs text-[#53483E] max-w-xl mx-auto space-y-1">
            <p className="font-bold text-[#143836]">【対応エリアと出張費について】</p>
            <p>・港区・中央区：出張費無料</p>
            <p>・千代田区・渋谷区・新宿区：+¥3,000 / その他東京23区：+¥5,000</p>
            <p>※23区外・近隣県への訪問もスケジュールによりご相談可能です。LINEよりお問い合わせください。</p>
          </div>

        </div>
      </section>

      {/* ===================================================
          10. 安全管理・診察について
          =================================================== */}
      <section id="safety" className="pt-14 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              SAFETY & MEDICAL CARE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              「自宅だからこそ、院内以上の安全基準を」
            </h2>
            <p className="text-sm text-[#53483E] mt-3 leading-relaxed">
              麻酔科領域で15年以上の全身管理経験を持つ医師が、確かな技術と徹底した安全対策で施術にあたります。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[14px] p-5 sm:p-6 space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center font-serif text-sm font-bold">
                1
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">医師が事前に診察</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                当日の体調、既往歴、内服薬、アレルギー歴を丁寧に確認した上で、安全に施術できるかを判断します。
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[14px] p-5 sm:p-6 space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center font-serif text-sm font-bold">
                2
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">施術中も状態を確認</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                点滴の滴下速度を細かく調整し、気分不良や体調変化の有無を観察しながら慎重に進行します。
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[14px] p-5 sm:p-6 space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center font-serif text-sm font-bold">
                3
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">必要に応じた施術中止</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                無理な施術は行いません。体調が優れないと医師が判断した場合は、安全第一で中断・中止いたします。
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[14px] p-5 sm:p-6 space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center font-serif text-sm font-bold">
                4
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">緊急時対応を想定</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                急なアレルギー反応や迷走神経反射が生じた場合にも、麻酔科医としての知見に基づき速やかに初期対応します。
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[14px] p-5 sm:p-6 space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center font-serif text-sm font-bold">
                5
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">医療器材の衛生管理</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                点滴針やチューブはすべて完全滅菌されたディスポーザブル（使い捨て）製品を使用。院内同等の清潔操作を徹底します。
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[14px] p-5 sm:p-6 space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#143836]/10 text-[#143836] flex items-center justify-center font-serif text-sm font-bold">
                6
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">安心のアフターフォロー</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                点滴終了後の注意事項をお伝えし、帰宅後も気になることがあれば公式LINEからいつでも医師へ相談できます。
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          11. 実際の訪問風景・動画 (Moved Up)
          =================================================== */}
      <section className="pt-14 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[960px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-8 sm:mb-10 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              VISIT MOVIE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              実際の訪問は、こんな雰囲気です。
            </h2>
            <p className="text-sm text-[#53483E] mt-3 leading-relaxed">
              ご予約から施術終了までの流れをご覧いただけます。
            </p>
          </div>

          {/* Clean YouTube Video Container */}
          <div className="bg-white border border-[#E2D7CA] rounded-[16px] overflow-hidden shadow-lg p-2 sm:p-3">
            <div className="relative aspect-video w-full rounded-[10px] overflow-hidden bg-black shadow-inner">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/0zCKHOX6LCk"
                title="LIF SKIN CLINIC 訪問点滴のご利用の流れ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          12. 利用の流れ (4 Steps Flow)
          =================================================== */}
      <section id="flow" className="pt-14 pb-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-12 sm:mb-16 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              FLOW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              ご利用の流れ
            </h2>
            <p className="text-sm text-[#53483E] mt-3 leading-relaxed">
              LINEから簡単に予約が完了し、当日はご自宅でお待ちいただくだけです。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-[#143836]">STEP 01</span>
                <MessageCircle className="w-5 h-5 text-[#06C755]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">LINEから相談</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                公式LINEを追加し、ご希望の日時や場所をお気軽にお送りください。
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-[#143836]">STEP 02</span>
                <Calendar className="w-5 h-5 text-[#8E6D42]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">日時・住所を確認</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                訪問スケジュールと問診票（体調・既往歴）をLINE上で事前に確認します。
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-[#143836]">STEP 03</span>
                <Stethoscope className="w-5 h-5 text-[#8E6D42]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">医師が訪問・診察</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                医師がご自宅へお伺いし、対面で体調を確認して点滴の準備を行います。
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-[#143836]">STEP 04</span>
                <CheckCircle2 className="w-5 h-5 text-[#143836]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#16120F]">点滴・終了</h3>
              <p className="text-xs text-[#53483E] leading-relaxed">
                約30〜45分の点滴を行い終了。そのままご自宅で自由にお過ごしいただけます。
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--line btn--shimmer text-sm px-6 py-3.5 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>空き状況をLINEで確認する</span>
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          13. FAQ (Prioritized 10 Questions)
          =================================================== */}
      <section id="faq" className="pt-14 pb-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-5 sm:px-6">
          
          <div className="max-w-2xl sm:mx-auto mb-10 sm:mb-14 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              よくあるご質問
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div 
                  key={index}
                  className="bg-white border border-[#E2D7CA] rounded-[10px] overflow-hidden transition-all shadow-sm"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-semibold text-[#16120F] focus:outline-none hover:bg-[#FAF8F5]/80 transition-colors"
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
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#53483E] leading-relaxed border-t border-[#E2D7CA]/40 bg-[#FAF8F5]/50">
                      <div className="flex items-start gap-3 pt-2">
                        <span className="w-6 h-6 rounded-full bg-[#DFCBA9]/50 text-[#8E6D42] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
          14. LINE相談CTA (Big Pre-Form CTA)
          =================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 text-center space-y-6">
          
          <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block font-serif">
            LINE CONSULTATION
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
            まずはLINEで、お気軽にご相談ください。
          </h2>

          <div className="space-y-2 text-sm sm:text-base text-[#53483E] leading-relaxed max-w-lg mx-auto py-2">
            <p className="font-medium text-[#16120F]">「自分にはどの点滴が合う？」</p>
            <p className="font-medium text-[#16120F]">「この住所まで来てもらえる？」</p>
            <p className="font-medium text-[#16120F]">「○日の夜は空いている？」</p>
            <p className="text-xs text-[#827467] pt-2">そんな質問だけでも構いません。担当スタッフ・医師が丁寧にお答えします。</p>
          </div>

          <div className="pt-2">
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--line btn--shimmer w-full sm:w-auto px-10 py-4.5 text-base sm:text-lg shadow-lg inline-flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 text-[#06C755] shrink-0" />
              <span>LINEで相談する</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </a>
          </div>

          <div className="pt-4">
            <a 
              href="#contact-form" 
              className="text-xs text-[#8E6D42] hover:text-[#143836] font-medium underline underline-offset-4"
            >
              フォームでのお問い合わせはこちら
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          15. 問い合わせフォーム (Contact Form)
          =================================================== */}
      <section id="contact-form" className="pt-14 pb-20 sm:py-20 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6">
          
          <div className="mb-10 text-left sm:text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
              INQUIRY FORM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
              WEBお問い合わせフォーム
            </h2>
            <p className="text-xs text-[#827467] mt-3">
              LINEをご利用でない方や、メール・お電話でのご案内をご希望の方はこちらからどうぞ。
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button 
              type="button"
              onClick={() => applyPresetQuestion('初回体験について')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-2xs"
            >
              「初回体験について」
            </button>
            <button 
              type="button"
              onClick={() => applyPresetQuestion('対応エリアについて')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-2xs"
            >
              「対応エリアについて」
            </button>
            <button 
              type="button"
              onClick={() => applyPresetQuestion('自分に合う点滴の相談')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F3ECE4] border border-[#E2D7CA] text-xs text-[#53483E] rounded-full transition-colors shadow-2xs"
            >
              「自分に合う点滴の相談」
            </button>
          </div>

          {contactSubmitted ? (
            <div className="bg-white border-2 border-[#143836] rounded-[16px] p-8 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-[#143836]/10 text-[#143836] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#16120F]">
                お問い合わせを受け付けました
              </h3>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed max-w-md mx-auto">
                内容を確認の上、担当医師・スタッフより速やかにご連絡を差し上げます。お急ぎの場合は、公式LINEよりご連絡いただくとスムーズです。
              </p>
              <div className="pt-2">
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer text-xs py-3 px-6"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755]" />
                  <span>LINEですぐにやり取りする</span>
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
                  className="w-full text-sm p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[8px] focus:outline-none focus:border-[#8E6D42]"
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
                  className="w-full text-sm p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[8px] focus:outline-none focus:border-[#8E6D42]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#16120F] mb-1.5">
                  メールアドレス（任意）
                </label>
                <input 
                  type="email" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="例：sample@example.com"
                  className="w-full text-sm p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[8px] focus:outline-none focus:border-[#8E6D42]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#16120F] mb-1.5">
                  ご相談内容・ご希望日時
                </label>
                <textarea 
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="ご希望のメニュー、訪問先エリア（市区町村）、ご希望の日時などをご自由にご記入ください。"
                  className="w-full text-sm p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[8px] focus:outline-none focus:border-[#8E6D42]"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="btn btn--gold btn--shimmer w-full text-base py-3.5 shadow-sm"
                >
                  <Send className="w-4 h-4 text-[#7A5723] shrink-0" />
                  <span>お問い合わせを送信する</span>
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
          16. フッター (Footer)
          =================================================== */}
      <footer className="bg-[#2D251F] text-[#FAF8F5] py-14 border-t border-[#44382F]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-6 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-bold tracking-wider block text-white">
                LIF SKIN CLINIC
              </span>
              <p className="text-xs text-[#DFCBA9] tracking-widest font-semibold">
                院長 宇佐美 潤（麻酔科専門医）
              </p>
              <p className="text-xs text-white/70 leading-relaxed max-w-md">
                東京都中央区勝どき6-3-2<br />
                ※本訪問点滴サービスは、医師による完全予約制の往診診療です。<br />
                事前のご予約・ご相談は公式LINEまたは当サイトより承っております。
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-[#DFCBA9] tracking-wider">
                【自由診療に関する法的掲示】
              </h4>
              <div className="space-y-1.5 text-white/80 leading-relaxed text-[11.5px]">
                <p>・本治療は公的医療保険が適用されない自由診療です。</p>
                <p>・点滴による効果・実感には個人差があります。</p>
                <p>・主な副作用・リスク：注射部位の疼痛、内出血、一時的な血管痛、低血糖症状、アレルギー反応など。体調に異常を感じた場合は直ちに投与を中断し、適切な医学的処置を行います。</p>
                <p>・費用は各メニューに記載の通り（往診料・診察代込）です。</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} LIF SKIN CLINIC. All rights reserved.
          </div>

        </div>
      </footer>

      {/* ===================================================
          17. 固定CTA (Mobile Fixed Bottom CTA)
          =================================================== */}
      <div className="fixed-cta-bar">
        <a 
          href="https://line.me" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="frost-btn frost-btn--line !w-full"
        >
          <div className="frost-btn-icon-wrap--line">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <span className="frost-btn-text text-sm">初回体験についてLINEで相談</span>
        </a>
      </div>

    </div>
  )
}
