import React, { useState } from 'react'
import { 
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
import doctorPhoto from './assets/images/白衣のプロフェッショナルポートレート (1).png'
import scenePhoto from './assets/images/hero_scene_v3.webp'
import heroMobileFull from './assets/images/hero_mobile_full_v4.webp'
import logoImage from './assets/images/logo-dr-concierge.png'
import suppliPhoto from './assets/images/suppli-banner.webp'
import tentekiPhoto from './assets/images/iv-drip-banner.webp'
import homeDripPhoto from './assets/images/scene_sofa_relax_drip.png'
import concernStaminaPhoto from './assets/images/concern-stamina-golf.webp'
import concernWorkPhoto from './assets/images/concern-work-performance.webp'
import concernGolfTravelPhoto from './assets/images/concern-golf-travel.webp'
import concernSkinPhoto from './assets/images/concern-skin-dullness.webp'
import clinicComparisonTable from './assets/images/clinic_comparison_table.webp'
import menuOverviewPhoto from './assets/images/menu-overview-couch-drip.png'
import menuBannerPremium from './assets/images/menu-banner-premium-recovery.png'
import menuPhotoPremium from './assets/images/menu-photo-premium-recovery.png'
import menuBannerNmn from './assets/images/menu-banner-nmn.png'
import menuPhotoNmn from './assets/images/menu-photo-nmn.png'
import menuBannerStemcell from './assets/images/menu-banner-stemcell.png'
import menuPhotoStemcell from './assets/images/menu-photo-stemcell.png'

interface FAQItem {
  question: string
  answer: string
}

export default function AppMansion() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  // Section 05: Comparison mode ("visit" | "clinic")

  // Section 06: Detailed Ingredients Accordion State
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false)

  // Section 06: Estimator calculator states
  const [estimateRegion, setEstimateRegion] = useState<number>(0)
  const [estimateDripType, setEstimateDripType] = useState<string>('recovery')
  const [estimateOptions, setEstimateOptions] = useState<boolean>(false)

  // Section 15: Interactive booking / contact question state
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 公式LINE遷移リンク
  // マンション住人専用のQRコードアクション経由URL(エルメ)。このURL経由で友だち追加すると
  // 自動で「住人専用リッチメニュー」に切り替わる(エルメのQRコードアクション設定による)。
  const LINE_URL = "https://s.lmes.jp/landing-qr/2011153828-irjwVbkO?uLand=L8Cki4"

  // 訪問薄毛治療: 将来的に専用LPを公開した際はここにURLを設定するとリンクが有効になる
  const HAIR_TREATMENT_LP_URL = ""

  const regionFees = [
    { name: '中央区 (Chuo-ku)', fee: 0, desc: '基本エリア・往診料無料' },
    { name: '港区 (Minato-ku)', fee: 0, desc: '基本エリア・往診料無料' },
    { name: 'その他 東京23区内', fee: 11000, desc: '周辺エリア・往診料一律 ¥11,000' }
  ]

  const dripPrices: Record<string, { name: string, price: number }> = {
    recovery: { name: 'プレミアムリカバリー点滴 (初回体験: ¥22,000 / 通常: ¥33,000)', price: 22000 },
    nmn: { name: 'NMN点滴 (エイジングケア)', price: 44000 },
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
    }
  ]

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !contactPhone) {
      alert("お名前と電話番号を入力してください。")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch("https://formsubmit.co/ajax/junusami1982@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          お名前: contactName,
          お電話番号: contactPhone,
          ご相談内容: contactMessage || "(未入力)",
          _subject: "【Dr. concierge】初回体験・お問い合わせがありました",
          _template: "table"
        })
      })
      if (!res.ok) throw new Error('send failed')
      setContactSubmitted(true)
    } catch (err) {
      alert("送信に失敗しました。お手数ですが公式LINEからご連絡ください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  const applyPresetQuestion = (preset: string) => {
    setContactMessage(`【質問の選択】: 「${preset}」について詳しく知りたいです。\n現在の体調やご要望など：`)
    const formEl = document.getElementById('contact-form')
    formEl?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#221D18] font-sans antialiased selection:bg-[#143836] selection:text-white pb-20 md:pb-0">
      
      {/* ===================================================
          Header & Navigation (2-Tier PC Layout: Top = Logo + Buttons, Bottom = Single-Line Menu)
          =================================================== */}
      <header className="site-header hidden lg:block">
        {/* 上段: ロゴ ＋ CTAボタン (1行) */}
        <div className="max-w-[1140px] mx-auto px-6 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <img
              src={logoImage}
              alt="Dr. concierge ドクターコンシェルジュ by LIF SKIN CLINIC"
              className="h-[58px] w-auto"
            />
          </a>

          {/* Header CTAs */}
          <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-header-line whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>LINEで相談・確認</span>
            </a>
            <a
              href="#contact-form"
              className="btn-header-reserve whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#7A5723] shrink-0" />
              <span>初回予約フォーム</span>
            </a>
          </div>
        </div>

        {/* 下段: ナビゲーションメニューバー (1行・改行なし) */}
        <div className="border-t border-[#EAE2D6] bg-[#F6F2EB]/60">
          <nav className="max-w-[1140px] mx-auto px-6 h-[40px] flex items-center justify-center gap-4 xl:gap-6 flex-nowrap whitespace-nowrap">
            <a href="#about-intro" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">点滴という選択</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#service-time" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">通院との比較</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#menu-detail" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">目的別メニュー・料金</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#resident-benefit" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">住民限定特典</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#doctor" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">担当医師紹介</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#trial" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">初回体験案内</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#safety" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">安全管理体制</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#flow" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">ご利用の流れ</a>
            <span className="text-[#D3C7B8] text-[10px] select-none">/</span>
            <a href="#faq" className="header-link text-[12.5px] xl:text-[13px] tracking-wide hover:text-[#143836] whitespace-nowrap">よくある質問</a>
          </nav>
        </div>
      </header>

      {/* モバイル: ヘッダーバーは非表示、ハンバーガーボタンのみ右上に浮かせて残す */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-[95] p-2.5 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#E2D7CA] text-[#53483E] shadow-[0_4px_14px_rgba(22,18,15,0.1)]"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {isMobileMenuOpen && (
          <div className="fixed top-16 right-4 left-4 z-[94] bg-[#FAF8F5] border border-[#E2D7CA] rounded-[16px] p-6 space-y-4 shadow-xl">
            <a href="#about-intro" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">点滴という選択</a>
            <a href="#service-time" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">通院との比較</a>
            <a href="#menu-detail" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">目的別メニュー・料金</a>
            <a href="#resident-benefit" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">住民限定特典</a>
            <a href="#hair-treatment" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">訪問での薄毛治療</a>
            <a href="#doctor" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">担当医師紹介</a>
            <a href="#trial" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">初回体験案内</a>
            <a href="#safety" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">安全管理体制</a>
            <a href="#flow" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">ご利用の流れ</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#53483E] py-1">よくある質問</a>
            <div className="pt-3 flex gap-3">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn-header-line flex-1 text-center justify-center">
                LINE相談
              </a>
              <a href="#contact-form" onClick={() => setIsMobileMenuOpen(false)} className="btn-header-reserve flex-1 text-center justify-center">
                予約フォーム
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================
          01 | ファーストビュー (Hero Section)
          =================================================== */}
      <section className="relative overflow-hidden pt-4 pb-3.5 sm:py-7 lg:py-12 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        {/* Ambient background image: 施術風景 (PC only — mobile uses the all-in-one hero graphic instead) */}
        <div className="hidden lg:block absolute top-0 left-0 right-0 h-full pointer-events-none z-0 overflow-hidden">
          <img
            src={scenePhoto}
            alt="明るいリビングで医師の往診を受けながらくつろぐ女性"
            className="w-full h-full object-cover object-right"
          />
          {/* Responsive overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/60 to-[#FAF8F5] opacity-0" />
          {/* PC: localized fade behind the price card / CTA buttons only (bottom-left quarter) */}
          <div className="absolute left-0 bottom-0 w-[60%] h-[65%] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(250,248,245,0.98)_0%,_rgba(250,248,245,0.8)_50%,_rgba(250,248,245,0)_85%)]" />
        </div>

        <div className="relative z-10 max-w-[1160px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* マンション住民限定LP: 住民向けの薄いバッジ(詳細は後方の住民限定特典セクションへ。FV画像は別途住民向けに差し替え予定) */}
            <a href="#resident-benefit" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8E6D42]/10 border border-[#8E6D42]/40 hover:bg-[#8E6D42]/15 transition-colors">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] text-[#8E6D42] uppercase font-serif">For Residents</span>
              <span className="w-px h-3 bg-[#8E6D42]/40" />
              <span className="text-[11px] sm:text-xs font-semibold text-[#143836] tracking-wide">TTT住民の皆さまへ</span>
            </a>

            {/* Mobile: single all-in-one hero graphic (logo/badge/headline/features/photo/price) */}
            <div className="lg:hidden relative -mt-4 sm:-mt-7 -mx-6">
              <img
                src={heroMobileFull}
                alt="Dr. concierge by LIF SKIN CLINIC 訪問点滴 通院の手間なく、いつもの自宅で。最上級のプライベート点滴。初回体験22,000円（税込）"
                className="w-full h-auto block"
              />
              {/* 価格カード周りの金装飾のギラつきを抑える白ベール（カード本体は避ける） */}
              {/* <div className="absolute inset-x-0 top-[56%] bottom-[27%] bg-gradient-to-b from-white/0 via-white/45 to-white/45 pointer-events-none" /> */}
            </div>

            <h1 className="hidden lg:block font-serif text-3xl sm:text-5xl lg:text-[44px] text-[#16120F] leading-[1.35] tracking-[0.02em]">
              <span className="inline-block">通院の手間なく、</span>
              <br />
              <span className="inline-block">いつもの自宅で。</span>
              <br />
              <span className="inline-block text-[#143836] sm:hidden">
                最上級の
                <br />
                プライベート点滴
              </span>
              <span className="hidden sm:inline-block text-[#143836]">最上級のプライベート点滴医療。</span>
            </h1>

            <p className="hidden lg:block text-[#8E6D42] font-semibold text-base sm:text-base tracking-[0.06em] font-serif">
              <span className="inline-block">移動・待ち時間ゼロ</span> <span className="inline-block">/ 麻酔科専門医が直接ご自宅へ往診</span>
            </p>

            <div className="hidden lg:inline-flex lg:flex-row lg:items-center gap-5 bg-white/95 backdrop-blur-sm border border-[#E2D7CA] rounded-[14px] py-3.5 px-6 shadow-[0_8px_24px_rgba(22,18,15,0.07)]">
              <span className="text-xs font-bold text-[#8E6D42] tracking-[0.15em] uppercase font-serif">初回体験プラン</span>
              <div className="flex items-baseline gap-2.5">
                <span className="relative inline-block font-serif text-sm text-[#A8988A] select-none">
                  ¥33,000
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="2" y1="88" x2="98" y2="12" stroke="#B9544A" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="font-serif text-[34px] font-extrabold text-[#143836] tracking-tight">¥22,000</span>
                <span className="text-xs text-[#827467]">（税込・往診料・診察代すべて込）</span>
              </div>
            </div>

            {/* Buttons Group */}
            <div className="-mt-2.5 sm:mt-0">
              {/* Mobile: exact match to the fixed bottom bar buttons */}
              <div className="flex sm:hidden gap-2.5">
                <a
                  href={LINE_URL}
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

              {/* Desktop: original full-size buttons */}
              <div className="hidden sm:flex flex-row gap-3.5">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--line btn--shimmer text-base px-7 py-4 whitespace-nowrap gap-2.5"
                >
                  <MessageCircle className="w-5 h-5 text-[#06C755] shrink-0" />
                  <span className="inline-block">初回体験を予約・相談する</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 shrink-0" />
                </a>
                <a
                  href="#contact-form"
                  className="btn btn--gold btn--shimmer text-base px-7 py-4 whitespace-nowrap gap-2.5"
                >
                  <Calendar className="w-5 h-5 text-[#7A5723] shrink-0" />
                  <span className="inline-block">WEBで初回体験を予約する</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          02〜04 | 導入セクション (悩みへの共感 → 点滴という選択 → 通院のハードル)
          ※コンパクトでテンポよく読める導入構成
          =================================================== */}
      <section id="about-intro" className="py-7 sm:py-9 bg-[#F3ECE4]/70 border-b border-[#E2D7CA]/60">
        <div className="max-w-[1040px] mx-auto px-6">
          
          {/* 02: 悩みへの共感 */}
          <div className="max-w-3xl mx-auto mb-8 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1 font-serif">
                01 CONCERNS
              </span>
              <h2 className="font-serif text-xl sm:text-3xl text-[#16120F] font-bold leading-tight whitespace-nowrap">
                こんなお悩みはありませんか？
              </h2>
            </div>
          </div>

          {/* 4 Concern Photos (text baked into images) */}
          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            <div className="overflow-hidden rounded-[16px] shadow-sm border border-[#E2D7CA]">
              <img
                src={concernStaminaPhoto}
                alt="年齢とともに体力や回復力の変化を感じている"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[16px] shadow-sm border border-[#E2D7CA]">
              <img
                src={concernWorkPhoto}
                alt="忙しくても仕事のパフォーマンスを維持したい"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[16px] shadow-sm border border-[#E2D7CA]">
              <img
                src={concernGolfTravelPhoto}
                alt="ゴルフや旅行、イベントを元気に楽しみたい"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[16px] shadow-sm border border-[#E2D7CA]">
              <img
                src={concernSkinPhoto}
                alt="肌のくすみや透明感の低下が気になる"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <p className="text-center font-serif text-base sm:text-lg text-[#16120F] leading-relaxed max-w-xl mx-auto mb-2">
            そのお悩み、加齢やストレスによる<br className="sm:hidden" />
            <span className="text-[#143836] font-bold">「栄養素の不足」</span>が原因かもしれません。
          </p>

        </div>
      </section>

      {/* ===================================================
          02 | 点滴という選択肢 (専用セクション)
          =================================================== */}
      <section id="iv-therapy" className="py-8 sm:py-10 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          <div className="max-w-2xl mx-auto">

          <div className="mb-8 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1 font-serif">
                02 IV THERAPY
              </span>
              <h2 className="text-2xl sm:text-3xl text-[#16120F] font-bold leading-tight">
                そのお悩みに、<br />
                点滴という選択肢を。
              </h2>
            </div>
          </div>

          {/* Hero Photo */}
          <div className="mb-8 sm:mb-10 overflow-hidden">
            <img
              src={homeDripPhoto}
              alt="自宅のリビングでソファにくつろぎながら点滴を受ける女性"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-8 sm:space-y-10">

            {/* なぜ、今「点滴ケア」なのか？ */}
            <div className="pl-[18px]">
              <h3 className="text-lg sm:text-xl font-bold text-[#7E490D] mb-3">
                なぜ、今「点滴ケア」なのか？
              </h3>
              <p className="text-[#53483E] text-base sm:text-base leading-[2] tracking-[0.03em]">
                点滴は、必要な成分を静脈から直接体内へ届ける方法です。
                <br className="hidden sm:block" />
                疲れが抜けにくいと感じるときや、美容・健康を意識したコンディションケアの選択肢として取り入れられています。
              </p>
            </div>

            {/* サプリメントとの違い */}
            <div className="pl-[18px] flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#7E490D] mb-3">
                  サプリメントとの違い
                </h3>
                <p className="text-[#53483E] text-base sm:text-base leading-[2] tracking-[0.03em]">
                  口から摂取した成分は、胃や腸で消化・吸収され、肝臓で代謝される過程を経て体内に取り込まれます。
                  <br className="hidden sm:block" />
                  一方、点滴は消化管を介さず、成分を静脈から直接体内へ投与できることが特徴です。
                </p>
              </div>
              <div className="sm:w-[300px] shrink-0 overflow-hidden">
                <img
                  src={suppliPhoto}
                  alt="サプリメントとの違い"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* 点滴だからできること */}
            <div className="pl-[18px] flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#7E490D] mb-3">
                  点滴だからできること
                </h3>
                <p className="text-[#53483E] text-base sm:text-base leading-[2] tracking-[0.03em]">
                  ビタミンやミネラルなど、目的に合わせた複数の成分を一度に補うことができます。
                  <br className="hidden sm:block" />
                  疲れが抜けにくいと感じる方、肌の調子や透明感が気になる方など、医師が適応を判断したうえでケアをご提案します。
                </p>
              </div>
              <div className="sm:w-[300px] shrink-0 overflow-hidden">
                <img
                  src={tentekiPhoto}
                  alt="点滴だからできること"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <p className="pl-[18px] text-xs text-[#8C8178]">
              ※点滴による感じ方や経過には個人差があります。すべての症状の改善や効果を保証するものではありません。
            </p>

          </div>

          </div>
        </div>
      </section>

      {/* ===================================================
          03-04 | 通う点滴から、自宅でくつろぐ点滴へ
          =================================================== */}
      <section id="service-time" className="py-8 sm:py-12 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">

          <div className="max-w-2xl mx-auto text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1 font-serif">
                03 A NEW STANDARD
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                通う点滴から、<br />
                自宅でくつろぐ点滴へ。
              </h2>
            </div>
            <p className="text-[#53483E] text-base sm:text-base mt-4 leading-relaxed text-left max-w-xl pl-4">
              クリニックに通うのではなく、医師・看護師があなたのご自宅へ。
              <br className="hidden sm:block" />
              移動や外出の準備に追われず、いつもの空間で、いつもの自分のままに。
              <br className="hidden sm:block" />
              点滴の時間を、自分らしくくつろぐひとときへと変える。
            </p>
            <p className="font-serif text-base font-bold text-[#143836] mt-5 text-left pl-4">
              それが、訪問点滴サービス<br />
              Dr. concierge（ドクターコンシェルジュ）です。
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mt-8 max-w-2xl mx-auto overflow-hidden rounded-[20px] shadow-sm border border-[#E2D7CA]">
            <img
              src={clinicComparisonTable}
              alt="通院との比較：待ち時間・移動・身支度・プライバシーの各項目でDr. conciergeが優れていることを示す比較表"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--line btn--shimmer text-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>初回体験を予約・相談する</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          04 | 目的別点滴メニュー・料金
          05 | 担当医師の紹介
          07 | 初回体験の案内
          ※この3セクションを間に挟まず連続配置
          =================================================== */}

      {/* 06: 目的別点滴メニュー・料金 */}
      <section id="menu-detail" className="pt-8 pb-10 sm:py-12 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">

          <div className="max-w-2xl mx-auto text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                04 DRIP MENUS & PRICING
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                美容と健康を支える<br />
                3つの点滴
              </h2>
            </div>
            <p className="text-[#53483E] text-base sm:text-base mt-4 leading-[2] tracking-[0.02em] text-left pl-4">
              疲れが抜けにくい。<br className="sm:hidden" />
              忙しくても、良いコンディションを保ちたい。<br className="sm:hidden" />
              年齢に応じた美容と健康のケアを取り入れたい。
              <br className="hidden sm:block" />
              お悩みや目的は、一人ひとり異なります。<br className="sm:hidden" />
              当サービスでは、日々のコンディション管理から、<br className="sm:hidden" />
              エイジングケアを意識したメンテナンスまで、<br className="sm:hidden" />
              ご希望に合わせて複数の点滴をご用意しています。<br className="sm:hidden" />
              当院おすすめの点滴3種をご紹介します。
            </p>
          </div>

          {/* Overview Photo */}
          <div className="mt-8 max-w-2xl mx-auto overflow-hidden">
            <img
              src={menuOverviewPhoto}
              alt="自宅のリビングでソファにくつろぎながら点滴を受ける男性"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 space-y-14 sm:space-y-16">

            {/* Menu 1: プレミアムリカバリー点滴 */}
            <div className="-mx-6 sm:mx-0 bg-[#F3ECE4] p-6 sm:p-10">
              <div className="overflow-hidden border border-[#8E6D42]/40">
                <h3 className="sr-only">プレミアムリカバリー点滴</h3>
                <img
                  src={menuBannerPremium}
                  alt="プレミアムリカバリー点滴"
                  className="w-full h-auto block"
                />
              </div>

              <p className="mt-4 pl-1 text-base sm:text-base text-[#8E6D42] font-bold">
                ── 蓄積した疲労をリセットし、<br className="sm:hidden" />
                本来のパフォーマンスを取り戻す
              </p>

              <p className="mt-4 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                「しっかり休んだはずなのに疲れが抜けない」<br className="sm:hidden" />
                「頭がすっきりしない」……<br className="sm:hidden" />
                そんな現代特有の慢性的な疲労に<br className="sm:hidden" />
                アプローチするために開発された、<br className="sm:hidden" />
                当院オリジナルの特別メニューです。
              </p>
              <p className="mt-3 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                厳選された6つの医療用有効成分を<br className="sm:hidden" />
                バランスよく配合し、<br className="sm:hidden" />
                <strong className="font-bold text-[#16120F]">サプリメントでは到達できない濃度で、<br className="sm:hidden" />ダイレクトに細胞へエネルギーを急速充電</strong>します。
              </p>

              <div className="mt-6 p-4 bg-white rounded-[10px] max-w-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#827467]">通常料金</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-lg font-bold text-[#16120F]">¥33,000</span>
                    <span className="text-[11px] text-[#827467]">（税込・往診料込）</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between mt-1 pt-1 border-t border-[#E2D7CA]/60 text-[#143836]">
                  <span className="text-xs font-bold">初回特別体験価格</span>
                  <span className="font-serif text-xl font-bold">¥22,000</span>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-[12px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 font-bold text-[#16120F] text-base sm:text-base">
                    <Sparkles className="w-4 h-4 text-[#8E6D42] shrink-0" />
                    ■ 贅沢に配合された「6つの贅沢成分」とその効果
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#827467] transition-transform duration-200 shrink-0 ${isIngredientsOpen ? 'rotate-180 text-[#8E6D42]' : ''}`} />
                </button>

                {isIngredientsOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#E2D7CA]">
                    <ol className="space-y-3.5 mt-4">
                      <li>
                        <p className="text-base sm:text-base text-[#16120F]">
                          <span className="font-bold">1. グルタチオン</span>
                          <span className="font-bold text-[#8E6D42]">　【強力デトックス・肝機能サポート】</span>
                        </p>
                        <p className="mt-1 pl-[1.4em] text-sm text-[#53483E] leading-[1.9]">
                          疲労やストレスで生じる「活性酸素」を強力に除去。肝臓の働きを助け、身体に溜まった毒素や老廃物の排出（デトックス）を促します。
                        </p>
                      </li>
                      <li>
                        <p className="text-base sm:text-base text-[#16120F]">
                          <span className="font-bold">2. 高濃度ビタミンC</span>
                          <span className="font-bold text-[#8E6D42]">　【細胞の抗酸化・免疫力UP】</span>
                        </p>
                        <p className="mt-1 pl-[1.4em] text-sm text-[#53483E] leading-[1.9]">
                          免疫力を高め、酸化（サビつき）から身体を守ります。疲労で低下した気力と体力を底上げします。
                        </p>
                      </li>
                      <li>
                        <p className="text-base sm:text-base text-[#16120F]">
                          <span className="font-bold">3. ビタミンB群</span>
                          <span className="font-bold text-[#8E6D42]">　【エネルギー産生・代謝促進】</span>
                        </p>
                        <p className="mt-1 pl-[1.4em] text-sm text-[#53483E] leading-[1.9]">
                          食事をエネルギーに変えるために不可欠なビタミン。代謝をスムーズにし、身体の内側から「元気」を作り出します。
                        </p>
                      </li>
                      <li>
                        <p className="text-base sm:text-base text-[#16120F]">
                          <span className="font-bold">4. チオクト酸（αリポ酸）</span>
                          <span className="font-bold text-[#8E6D42]">　【抗酸化・コンディションケア】</span>
                        </p>
                        <p className="mt-1 pl-[1.4em] text-sm text-[#53483E] leading-[1.9]">
                          ビタミンCやEと並ぶ抗酸化力を持ち、疲労回復をサポートします。新陳代謝を促進するため、コンディションづくりにも寄与します。
                        </p>
                      </li>
                      <li>
                        <p className="text-base sm:text-base text-[#16120F]">
                          <span className="font-bold">5. グリチルリチン酸（強ミノ同等成分）</span>
                          <span className="font-bold text-[#8E6D42]">　【肝機能サポート】</span>
                        </p>
                        <p className="mt-1 pl-[1.4em] text-sm text-[#53483E] leading-[1.9]">
                          生薬の甘草（カンゾウ）由来の成分で、肝機能を保護・サポートします。忙しい日々が続く方の体調維持を支えます。
                        </p>
                      </li>
                      <li>
                        <p className="text-base sm:text-base text-[#16120F]">
                          <span className="font-bold">6. マグネシウム</span>
                          <span className="font-bold text-[#8E6D42]">　【筋肉のコリ・神経の緊張緩和】</span>
                        </p>
                        <p className="mt-1 pl-[1.4em] text-sm text-[#53483E] leading-[1.9]">
                          肩こりや慢性的な筋肉の疲労、緊張を和らげ、心身をリラックスへと導くミネラルです。
                        </p>
                      </li>
                    </ol>
                    <p className="mt-3 text-[11px] text-[#827467] leading-relaxed">
                      ※成分の配合内容や投与量は、医師が問診・診察を行った上で個人の体調に合わせて調整いたします。
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 p-5 bg-white">
                <p className="font-bold text-[#8E6D42] text-base sm:text-base mb-2">このような方に</p>
                <ul className="space-y-1.5 text-sm text-[#53483E] leading-relaxed">
                  <li>・心身ともに即効性のあるエネルギーチャージを求めている方</li>
                  <li>・肌のくすみや透明感が気になる方</li>
                  <li>・睡眠をとっても翌朝に疲れが残っている方</li>
                  <li>・お酒を飲む機会が多く、翌日スッキリ起きられない方</li>
                </ul>
              </div>

              <div className="mt-6 max-w-sm overflow-hidden">
                <img
                  src={menuPhotoPremium}
                  alt="伸びをしながら爽快感を感じる女性"
                  className="w-full h-auto object-cover"
                />
              </div>

              <p className="mt-4 text-xs text-[#827467] leading-relaxed">所要時間：約60分（静脈点滴投与）</p>

              <div className="mt-6">
                <a
                  href="#trial"
                  className="btn btn--gold btn--shimmer w-full sm:w-auto text-xs !py-3.5 !px-8 text-center justify-center font-bold"
                >
                  初回体験プランを予約
                </a>
              </div>
            </div>

            {/* Menu 2: NMN点滴 */}
            <div className="-mx-6 sm:mx-0 bg-[#F3ECE4] p-6 sm:p-10">
              <div className="overflow-hidden border border-[#B98A2E]/40">
                <h3 className="sr-only">NMN点滴</h3>
                <img
                  src={menuBannerNmn}
                  alt="NMN点滴"
                  className="w-full h-auto block"
                />
              </div>

              <p className="mt-4 pl-1 text-base sm:text-base text-[#B98A2E] font-bold">
                ── 細胞レベルで若々しさを呼び覚ます、<br className="sm:hidden" />
                究極のウェルネスケア
              </p>

              <p className="mt-4 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                NMN（ニコチンアミド・モノヌクレオチド）は、<br className="sm:hidden" />
                ビタミンB3の中に含まれる成分で、<br className="sm:hidden" />
                私たちの身体の「若々しさ」や「元気の源」を司る<br className="sm:hidden" />
                【長寿遺伝子（サーチュイン遺伝子）】を活性化させる<br className="sm:hidden" />
                物質として、今、世界中の研究者から注目を集めています。
              </p>
              <p className="mt-3 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                人は年齢を重ねると、体内のNMNが減少していき、<br className="sm:hidden" />
                それが体力低下や肌の衰えなどの「老化現象」につながります。
              </p>
              <p className="mt-3 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                この減少してしまった若返り成分を、<br className="sm:hidden" />
                <strong className="font-bold text-[#16120F]">点滴によってダイレクトに、<br className="sm:hidden" />かつ高濃度で全身の細胞へ<br className="sm:hidden" />届ける</strong>のが「NMN点滴」です。
              </p>

              <div className="mt-6 p-4 bg-white rounded-[10px] max-w-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#827467]">料金</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-lg font-bold text-[#B98A2E]">¥44,000〜</span>
                    <span className="text-[11px] text-[#827467]">（税込・往診料込）</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#827467] block mt-1">※投与量（150mg〜）に応じてご案内</span>
              </div>

              <div className="mt-6 p-5 bg-white">
                <p className="font-bold text-[#B98A2E] text-base sm:text-base mb-2">このような方に</p>
                <ul className="space-y-1.5 text-sm text-[#53483E] leading-relaxed">
                  <li>・脳のエイジングケア<br className="sm:hidden" />（集中力・思考力の向上、睡眠の質の改善）をしたい方</li>
                  <li>・若い頃に比べて、体力や集中力が落ちたと感じる方</li>
                  <li>・忙しい日々が続き、慢性的な疲労感から抜け出せない方</li>
                  <li>・代謝を上げ、疲れにくい身体を目指したい方</li>
                </ul>
              </div>

              <div className="mt-6 max-w-sm overflow-hidden">
                <img
                  src={menuPhotoNmn}
                  alt="自然な笑顔で歩く夫婦"
                  className="w-full h-auto object-cover"
                />
              </div>

              <p className="mt-4 text-xs text-[#827467] leading-relaxed">
                ※NMNに関する研究は進められていますが、期待される働きや感じ方には個人差があります。
              </p>
              <div className="mt-2 text-xs text-[#53483E] leading-relaxed space-y-1">
                <p>所要時間：約30分（静脈点滴投与）</p>
                <p className="text-[#827467]">※使用するNMN製剤は国内未承認医薬品です。<a href="#regulatory" className="underline hover:text-[#8E6D42]">詳しくはこちら</a></p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => applyPresetQuestion('NMN点滴')}
                  className="btn btn--gold btn--shimmer w-full sm:w-auto text-xs !py-3.5 !px-8 text-center justify-center font-bold"
                >
                  この点滴について問い合わせる
                </button>
              </div>
            </div>

            {/* Menu 3: 幹細胞上清液点滴 */}
            <div className="-mx-6 sm:mx-0 bg-[#F3ECE4] p-6 sm:p-10">
              <div className="overflow-hidden border border-[#B98A2E]/40">
                <h3 className="sr-only">幹細胞上清液点滴</h3>
                <img
                  src={menuBannerStemcell}
                  alt="幹細胞上清液点滴"
                  className="w-full h-auto block"
                />
              </div>

              <p className="mt-4 pl-1 text-base sm:text-base text-[#B98A2E] font-bold">
                ── 老化した組織に働きかける、<br className="sm:hidden" />
                再生医療由来の根本アプローチ
              </p>

              <p className="mt-4 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                幹細胞上清液（培養上清液）とは、<br className="sm:hidden" />
                幹細胞を培養する過程で分泌される、<br className="sm:hidden" />
                数百種類もの成長因子（サイトカイン）や<br className="sm:hidden" />
                エクソソームを含んだ液体成分です。
              </p>
              <p className="mt-3 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                細胞そのものを移植するのではなく、<br className="sm:hidden" />
                <strong className="font-bold text-[#16120F]">細胞が持つ「修復を促す情報」だけを<br className="sm:hidden" />濃縮して届ける</strong>ことで、<br className="sm:hidden" />
                身体がもともと持つ再生力・回復力へ<br className="sm:hidden" />
                働きかけるアプローチです。
              </p>
              <p className="mt-3 text-base sm:text-base text-[#53483E] leading-[2] tracking-[0.02em]">
                厳格な基準で管理された国産上清液を使用し、<br className="sm:hidden" />
                美容・体力・活力の根本的なケアをサポートします。
              </p>

              <div className="mt-6 p-4 bg-white rounded-[10px] max-w-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#827467]">料金</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-lg font-bold text-[#B98A2E]">¥99,000〜</span>
                    <span className="text-[11px] text-[#827467]">（税込・往診料込）</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#827467] block mt-1">※厳格な基準で管理された国産上清液を使用</span>
              </div>

              <div className="mt-6 p-5 bg-white">
                <p className="font-bold text-[#B98A2E] text-base sm:text-base mb-2">このような方に</p>
                <ul className="space-y-1.5 text-sm text-[#53483E] leading-relaxed">
                  <li>・美容と健康の両面から、根本的なケアを求めている方</li>
                  <li>・年齢に応じたコンディション低下が<br className="sm:hidden" />気になり始めた方</li>
                  <li>・最高峰のウェルネスケアに関心がある方</li>
                  <li>・これまでの点滴では物足りなさを感じている方</li>
                </ul>
              </div>

              <div className="mt-6 max-w-sm overflow-hidden">
                <img
                  src={menuPhotoStemcell}
                  alt="窓辺で穏やかな表情を浮かべる女性"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="mt-4 text-xs text-[#53483E] leading-relaxed space-y-1">
                <p className="text-[#827467]">所要時間：約30〜45分（静脈点滴投与）</p>
                <p className="text-[#827467]">※使用する幹細胞上清液製剤は国内未承認医薬品です。<a href="#regulatory" className="underline hover:text-[#8E6D42]">詳しくはこちら</a></p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => applyPresetQuestion('幹細胞上清液点滴')}
                  className="btn btn--gold btn--shimmer w-full sm:w-auto text-xs !py-3.5 !px-8 text-center justify-center font-bold"
                >
                  この点滴について問い合わせる
                </button>
              </div>
            </div>

          </div>

          {/* Pricing Calculator Bar (非表示: 機能は残したまま表示のみ無効化) */}
          <div className="hidden bg-white border border-[#E2D7CA] p-5 sm:p-6 rounded-[14px] shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-[#E2D7CA] pb-3 mb-4">
              <h3 className="font-serif text-base font-bold text-[#16120F] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9E7D52]"></span>
                <span>料金シミュレーター</span>
              </h3>
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
                    <option key={i} value={i}>{r.name} ({r.fee === 0 ? "往診料無料" : `+¥${r.fee.toLocaleString()}`})</option>
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
                  <option value="nmn">NMN点滴 (¥44,000〜)</option>
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
                <span className="block text-[11px] text-[#827467]">お支払総額</span>
                <span className="block text-[11px] text-[#827467]">（税込・往診料込）</span>
                <span className="font-serif text-2xl font-bold text-[#143836]">¥{calculatedTotal.toLocaleString()}</span>
              </div>
              <a
                href="#contact-form"
                className="btn btn--gold btn--shimmer text-xs !py-2.5 !px-5 whitespace-nowrap shrink-0"
              >
                この内容で予約
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          マンション住民限定LP専用セクション | 住民限定特典
          ※ここまでで目的別点滴メニュー・料金を読んだ後なので「定期会員プラン」の内容が伝わった状態で提示する
          ※募集人数・適用条件は未確定のため具体的な数値・期限は記載しない
          =================================================== */}
      <section id="resident-benefit" className="py-8 sm:py-11 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6">

          <div className="max-w-xl mx-auto mb-8 text-left">
            <div className="border-l-2 border-[#8E6D42]/70 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#8E6D42] uppercase block mb-1.5 font-serif">
                For Residents ── TTT住民限定特典
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold leading-tight">
                住民の皆さまだけの、特別なご案内
              </h2>
            </div>
          </div>

          {/* 特典カード(詳細はLINE側で案内するため概要のみ) */}
          <div className="bg-[#FBF8F3] border-2 border-[#8E6D42]/50 rounded-[18px] p-6 sm:p-8 shadow-sm max-w-xl mx-auto text-center">
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#143836] leading-snug mb-3">
              定期会員プラン<br className="sm:hidden" />
              通常価格より<span className="text-[#8E6D42]">10%OFF</span>
            </p>
            <p className="text-sm text-[#53483E] leading-relaxed mb-6">
              人数限定の特別優待をご用意しています。<br />
              詳しいプラン内容・料金は、公式LINEからご確認いただけます。
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--line btn--shimmer w-full text-center justify-center text-sm !py-3.5 gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>公式LINEで会員プランを見る</span>
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          マンション住民限定LP専用セクション | 訪問での薄毛治療(コンパクト紹介)
          =================================================== */}
      <section id="hair-treatment" className="py-7 sm:py-9 bg-[#F3ECE4]/70 border-b border-[#E2D7CA]/60">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex-1">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                Additional Care ── その他の訪問メニュー
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#16120F] mb-2">
                訪問での薄毛治療にも対応
              </h2>
              <p className="text-xs sm:text-sm text-[#53483E] leading-relaxed">
                幹細胞培養上清液を用いた頭皮への注入治療です。男性・女性ともにご利用いただけます。
                点滴メニューと同様、医師による診察のうえで実施可否・内容を判断いたします。
              </p>
              <p className="text-[11px] text-[#827467] leading-relaxed mt-2">
                ※本メニューで使用する幹細胞培養上清液製剤は、国内で医薬品として承認されたものではありません。<a href="#regulatory" className="underline hover:text-[#8E6D42]">詳しくはこちら</a>
              </p>
              <p className="text-[11px] text-[#827467] leading-relaxed mt-1">
                料金・施術内容の詳細は個別にご案内します。まずはお気軽にご相談ください。
              </p>
            </div>
            <div className="shrink-0 flex sm:flex-col gap-2.5">
              {HAIR_TREATMENT_LP_URL ? (
                <a
                  href={HAIR_TREATMENT_LP_URL}
                  className="btn btn--gold text-xs !py-2.5 !px-5 whitespace-nowrap text-center justify-center"
                >
                  薄毛治療の詳細を見る
                </a>
              ) : (
                <span className="text-[11px] text-[#A8988A] whitespace-nowrap">専用ページは準備中です</span>
              )}
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--line text-xs !py-2.5 !px-5 whitespace-nowrap text-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#06C755] shrink-0" />
                <span>薄毛治療について質問する</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 07: 担当医師の紹介 (連続配置 2/3) */}
      <section id="doctor" className="pt-8 pb-10 sm:py-12 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[1160px] mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="hidden lg:block lg:col-span-5">
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
                  05 DOCTOR PROFILE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16120F] leading-tight whitespace-nowrap">
                  医師が直接ご自宅へ伺います
                </h2>
              </div>
              
              <div className="space-y-3.5 text-[#53483E] text-sm leading-relaxed font-normal">
                <p>
                  はじめまして。LIF SKIN CLINIC 院長の宇佐美潤です。
                  私は大学病院などで約10年間、麻酔科医として勤務したのち、美容医療の世界へ進みました。
                </p>
                <p>
                  麻酔科では、無数の静脈確保や全身の循環管理、救急対応の中で、徹底した安全管理の技術を磨いてまいりました。
                  点滴医療は身体に針を通して直接薬剤を届ける医療行為だからこそ、技術と安全への配慮が不可欠です。
                </p>
                <p>
                  「Dr. concierge」という名前には、ただご自宅へ点滴に伺うだけでなく、専属の医師としてその日の体調やご希望をうかがいながら、最適な一本を一緒に考えていきたいという思いを込めました。
                  「通院の時間が取れない」「人目を気にせずリラックスして受けたい」という方へ、病院と同等水準の安全性と、気負わないプライベートな時間をご自宅にお届けします。
                </p>
                <p>
                  実は私自身も、この建物に暮らす住民の一人です。
                  エレベーターでお会いする機会があるかもしれませんが、同じ建物で暮らす「かかりつけ医」のような存在として、気負わずお声がけいただけたら嬉しく思います。
                </p>
              </div>

              {/* Mobile-only: doctor photo & title, shown after the intro text */}
              <div className="lg:hidden flex items-center gap-5 pt-1">
                <div className="w-[165px] h-[165px] rounded-full overflow-hidden border border-[#E2D7CA] shrink-0 shadow-sm">
                  <img
                    src={doctorPhoto}
                    alt="LIF SKIN CLINIC 院長 宇佐美 潤"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="border-l-4 border-[#143836] pl-3.5">
                  <span className="text-xs text-[#143836] font-bold block">LIF SKIN CLINIC 院長</span>
                  <h3 className="font-serif text-lg font-bold text-[#16120F]">宇佐美 潤</h3>
                  <span className="text-[11px] text-[#827467] leading-relaxed block mt-0.5 font-medium">
                    日本麻酔科学会認定専門医 / 心臓血管麻酔専門医
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a 
                  href={LINE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--line btn--shimmer text-xs py-3 px-6 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>初回体験を予約・相談する</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 shrink-0" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          06 | 安全管理・安心して受けるための体制(価格オファーより先に安心材料を提示)
          =================================================== */}
      <section id="safety" className="pt-8 pb-10 sm:py-12 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">

          <div className="mb-12 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                06 SAFETY & QUALITY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                安心して点滴を<br />
                受けていただくための体制
              </h2>
            </div>
            <p className="text-[#53483E] text-base sm:text-base mt-4 leading-relaxed text-left max-w-xl pl-4">
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
                <p className="text-[13px] text-[#53483E] leading-relaxed">
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
                <p className="text-[13px] text-[#53483E] leading-relaxed">
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
                <p className="text-[13px] text-[#53483E] leading-relaxed">
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
                <p className="text-[13px] text-[#53483E] leading-relaxed">
                  使用する針やチューブなどの器材はすべて完全使い捨て（ディスポーザブル）を使用し、衛生面を徹底管理します。
                </p>
              </div>
            </div>

          </div>

          {/* Reassurance Photo */}
          <img
            src={homeDripPhoto}
            alt="自宅のリビングでソファにくつろぎながら点滴を受ける女性"
            className="mt-8 max-w-xl w-full mx-auto h-auto object-cover block"
          />

        </div>
      </section>

      {/* 08: 初回体験の案内 */}
      <section id="trial" className="pt-8 pb-10 sm:py-12 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[880px] mx-auto px-6 text-center">

          <div className="max-w-lg mx-auto mb-10 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                07 TRIAL OFFER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                まずは一度、ご自宅で<br />
                体験してみてください。
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

              <h4 className="font-serif text-[21px] font-black text-[#143836] mb-3 pb-1 border-b-2 border-[#8E6D42] tracking-wide inline-block">
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
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--line btn--shimmer w-full text-center justify-center text-[13.5px] sm:text-sm !py-3.5 whitespace-nowrap gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>初回体験を予約・相談する</span>
                </a>
                <a
                  href="#contact-form"
                  className="btn btn--gold btn--shimmer w-full text-center justify-center text-[13.5px] sm:text-sm !py-3.5 whitespace-nowrap gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#7A5723] shrink-0" />
                  <span>WEBで初回体験を予約する</span>
                </a>
              </div>

              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#53483E] underline hover:text-[#8E6D42] mt-4 inline-block"
              >
                予約の前に、医師に質問する
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          08 | 訪問の様子を紹介する動画
          =================================================== */}
      <section className="pt-8 pb-10 sm:py-12 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[960px] mx-auto px-6">
          
          <div className="mb-10 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                08 CONCEPT MOVIE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                訪問施術の様子を動画で見る
              </h2>
            </div>
            <p className="text-[#53483E] text-base sm:text-base mt-4 leading-relaxed text-left max-w-xl pl-4">
              ご自宅でのリラックスした施術風景や、医師の丁寧な対応の流れをご確認いただけます。
            </p>
          </div>

          {/* Video Container */}
          <div className="bg-white border-2 border-[#E2D7CA] rounded-[18px] overflow-hidden shadow-md p-2 sm:p-4">
            <div className="relative aspect-video w-full rounded-[10px] overflow-hidden bg-black shadow-inner">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/0zCKHOX6LCk"
                title="Dr. concierge 訪問点滴のご紹介"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================
          10 | ご利用の流れ (動画の直後に配置)
          =================================================== */}
      <section id="flow" className="pt-8 pb-10 sm:py-12 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[1040px] mx-auto px-6">
          
          <div className="mb-14 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                09 HOW TO USE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                ご利用の流れ
              </h2>
            </div>
            <p className="text-[#53483E] text-base sm:text-base mt-4 leading-relaxed text-left max-w-xl pl-4">
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
                  <p className="text-[13px] text-[#53483E] leading-relaxed">
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
                  <p className="text-[13px] text-[#53483E] leading-relaxed">
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
                  <p className="text-[13px] text-[#53483E] leading-relaxed">
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
                  <p className="text-[13px] text-[#53483E] leading-relaxed">
                    施術後の注意事項をお伝えします。終了後も気になることがあればLINEで相談可能です。
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href={LINE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--line btn--shimmer inline-flex items-center gap-2 !py-3.5 !px-8 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>初回体験を予約・相談する</span>
            </a>
          </div>

        </div>
      </section>

      {/* ===================================================
          11 | よくある質問 (FAQ)
          =================================================== */}
      <section id="faq" className="pt-8 pb-10 sm:py-12 bg-white border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6">
          
          <div className="mb-14 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                10 FAQ
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
                    className="w-full p-4.5 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-base font-semibold text-[#16120F] focus:outline-none"
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
      <section className="py-7 sm:py-9 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block font-serif">
            11 SERVICE AREA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#16120F] font-bold">
            往診対応エリア
          </h2>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2D7CA] rounded-2xl sm:rounded-full shadow-sm text-base sm:text-base font-serif font-bold text-[#16120F]">
            <MapPin className="w-4 h-4 text-[#8E6D42] shrink-0" />
            <span className="leading-snug text-center text-base">
              東京都中央区・港区<br className="sm:hidden" />（往診料無料・完全予約制）
            </span>
          </div>
          <p className="text-[13px] text-[#53483E] max-w-lg mx-auto leading-relaxed pt-1">
            その他東京23区内（往診料 +¥11,000）もお伺い可能です。23区外への往診もスケジュール次第で対応いたしますので、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* ===================================================
          15 | 相談・お問い合わせフォーム (Contact & Inquiry)
          =================================================== */}
      <section id="contact-form" className="pt-8 pb-10 sm:py-12 bg-[#FAF8F5] border-b border-[#E2D7CA]">
        <div className="max-w-[780px] mx-auto px-6">
          
          <div className="mb-10 text-left">
            <div className="border-l-2 border-[#143836]/60 pl-4 py-0.5 text-left w-full">
              <span className="text-xs font-bold tracking-[0.2em] text-[#143836] uppercase block mb-1.5 font-serif">
                12 CONTACT & RESERVATION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#16120F] font-bold leading-tight">
                初回体験の予約・ご相談
              </h2>
            </div>
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
                  href={LINE_URL} 
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
                  placeholder="例：初回体験を希望します。来週月曜日の午前中は空いていますか？（訪問先：中央区勝どき）"
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E2D7CA] rounded-[6px] focus:outline-none focus:border-[#9E7D52]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--gold btn--shimmer w-full text-sm py-3.5 whitespace-nowrap font-bold disabled:opacity-60"
                >
                  <Send className="w-4 h-4 text-[#7A5723] shrink-0" />
                  <span>{isSubmitting ? '送信中...' : '初回体験を予約する'}</span>
                </button>
              </div>

              <p className="text-xs text-center text-[#827467] leading-relaxed">
                ※ご入力いただいた個人情報は、訪問診療のご連絡のみに使用し、第三者に提供することはございません。
              </p>
            </form>
          )}

        </div>
      </section>

      {/* ===================================================
          16 | 医療広告・安全性に関する情報
          =================================================== */}
      <section id="regulatory" className="py-7 sm:py-10 bg-[#F3ECE4] border-b border-[#E2D7CA]">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="bg-white border border-[#E2D7CA] rounded-[16px] p-6 sm:p-9 shadow-sm">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#16120F] mb-6 text-center">
              医療広告ガイドラインおよび安全性に関する公的開示事項
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#143836] mb-3">NMN点滴について</h4>
                <dl className="space-y-3 text-xs text-[#53483E] leading-relaxed">
                  <div>
                    <dt className="font-bold text-[#16120F]">医薬品医療機器等法上の位置づけ（未承認医薬品）</dt>
                    <dd>本メニューで使用するNMN製剤は、日本国内で医薬品として承認されたものではありません。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">入手経路等について</dt>
                    <dd>国内の製造元より国産の製剤を仕入れて使用しております。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">国内の同一性能を有する承認医薬品等の有無</dt>
                    <dd>ビタミンC・ビタミンB群など個別の成分には国内承認医薬品がありますが、NMN製剤そのもの、または同一配合での承認医薬品はありません。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">諸外国における安全性等に係る情報</dt>
                    <dd>海外においてもNMNを注射剤として承認した医薬品はなく、ヒトでの静脈内投与に関する研究は限られています。国内の臨床研究では、300mgの静脈内投与で主要な臓器に明らかな影響は認められなかったと報告されています。</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-5 border-t border-[#E2D7CA]">
                <h4 className="font-serif text-sm font-bold text-[#143836] mb-3">幹細胞上清液点滴について</h4>
                <dl className="space-y-3 text-xs text-[#53483E] leading-relaxed">
                  <div>
                    <dt className="font-bold text-[#16120F]">医薬品医療機器等法上の位置づけ（未承認医薬品）</dt>
                    <dd>本メニューで使用する幹細胞上清液製剤は、日本国内で医薬品として承認されたものではありません。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">入手経路等について</dt>
                    <dd>国内の製造元より国産の製剤を仕入れて使用しております。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">国内の同一性能を有する承認医薬品等の有無</dt>
                    <dd>本邦において同一の成分・性能を有する承認医薬品は存在しません。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">諸外国における安全性等に係る情報</dt>
                    <dd>米国FDA等においても、幹細胞由来成分（エクソソームを含む）を治療目的で使用することを承認した製品は現時点でありません。</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-5 border-t border-[#E2D7CA]">
                <h4 className="font-serif text-sm font-bold text-[#143836] mb-3">訪問での薄毛治療（幹細胞培養上清液の頭皮注入）について</h4>
                <dl className="space-y-3 text-xs text-[#53483E] leading-relaxed">
                  <div>
                    <dt className="font-bold text-[#16120F]">医薬品医療機器等法上の位置づけ（未承認医薬品）</dt>
                    <dd>本メニューで使用する幹細胞培養上清液製剤は、上記の幹細胞上清液点滴と同様、日本国内で医薬品として承認されたものではありません。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">入手経路等について</dt>
                    <dd>国内の製造元より国産の製剤を仕入れて使用しております。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">国内の同一性能を有する承認医薬品等の有無</dt>
                    <dd>本邦において同一の成分・性能を有する承認医薬品は存在しません。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">諸外国における安全性等に係る情報</dt>
                    <dd>米国FDA等においても、幹細胞由来成分（エクソソームを含む）を治療目的で使用することを承認した製品は現時点でありません。</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#16120F]">訪問での実施について</dt>
                    <dd>無診察での施術は行いません。訪問での実施可否や詳細の運用は、医師による診察のうえで判断いたします。</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          17 | クリニック概要 ＆ 自由診療に関する法的掲示
          =================================================== */}
      <footer className="bg-[#382E26] text-[#FAF8F5] py-7 border-t border-[#4E4137]">
        <div className="max-w-[1160px] mx-auto px-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider block text-white mb-2">
                <span className="block sm:inline">Dr. concierge</span>
                <span className="block sm:inline text-base sm:text-lg"> by LIF SKIN CLINIC</span>
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
            &copy; {new Date().getFullYear()} Dr. concierge by LIF SKIN CLINIC. All rights reserved.
          </div>

        </div>
      </footer>

      {/* ===================================================
          17 | モバイル固定フッターCTA (Frost Glass Style)
          =================================================== */}
      <div className="fixed-cta-bar">
        <a 
          href={LINE_URL} 
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
