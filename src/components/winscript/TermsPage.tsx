import { motion } from "framer-motion";
import {
  Apple,
  BadgeDollarSign,
  Banknote,
  Check,
  CheckCircle2,
  Copy,
  Lock,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { TopBar } from "./TopBar";
import { LoadingDialog } from "./LoadingDialog";
import { GAMES, PLATFORM, type GameId } from "./platforms";
import { VerifyDialog } from "./VerifyDialog";

const PROMO = "JAC15";
const TELEGRAM_LINK = "https://t.me/+3OgVOYihck8yYjE0";
const REGISTER_LINK =
  "https://reffpa.com/L?tag=d_3355598m_97c_&site=3355598&ad=97&r=registration";

function Step({
  index,
  total,
  title,
  subtitle,
  icon,
  done,
  children,
}: {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  done?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className="relative"
    >
      {/* timeline rail */}
      {index < total && (
        <span
          aria-hidden
          className={`absolute -bottom-3 right-[17px] top-[42px] w-px ${
            done
              ? "bg-gradient-to-b from-neon/70 to-neon/10"
              : "bg-gradient-to-b from-white/12 to-white/5"
          }`}
        />
      )}

      <div className="luxe-card relative overflow-hidden rounded-2xl p-4">
        <span className="luxe-hairline-top" />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-neon/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-all duration-500 ${
              done
                ? "border-neon bg-neon text-background shadow-[0_0_20px_-4px_var(--neon)]"
                : "border-neon/25 bg-neon/[0.06] text-neon"
            }`}
          >
            {done ? <Check className="h-4 w-4" strokeWidth={3} /> : icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neon/60">
              {String(index).padStart(2, "0")} — {String(total).padStart(2, "0")}
            </p>
            <h2 className="mt-0.5 text-[13px] font-extrabold leading-snug">{title}</h2>
            {subtitle && (
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

export function TermsPage({
  initialUserId = "",
  onVerified,
}: {
  initialUserId?: string;
  onVerified: (game: GameId, userId: string) => void;
}) {
  const [userId, setUserId] = useState(initialUserId);
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [loadingGame, setLoadingGame] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO);
    } catch {
      /* clipboard unavailable */
    }
    toast("تم نسخ البروموكود");
  };

  const pickGame = (id: GameId) => {
    if (loadingGame) return;
    setLoadingGame(true);
    setTimeout(() => {
      setLoadingGame(false);
      setSelectedGame(id);
      toast("تم الاتصال باللعبة المطلوبة");
    }, 3000);
  };

  const idValid = /^\d{6,14}$/.test(userId.trim());
  const doneCount = [idValid, Boolean(selectedGame)].filter(Boolean).length;
  const pct = 20 + doneCount * 40;
  const ready = idValid && Boolean(selectedGame);
  const TOTAL = 5;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen"
    >
      <TopBar />

      <main className="relative mx-auto max-w-sm px-4 pb-10 pt-4">
        {/* hero */}
        <section className="relative overflow-hidden rounded-3xl border border-neon/20 px-4 py-6 text-center">
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_oklab,var(--neon)_12%,transparent),transparent_65%)]" />
          <span className="pointer-events-none absolute inset-0 grid-veil opacity-30" />
          <span className="luxe-hairline-top" />

          <div className="relative mx-auto grid h-20 w-20 place-items-center">
            <span className="orbit-ring absolute inset-0 rounded-full border border-neon/25" />
            <span className="absolute inset-0 animate-spin rounded-full border-t-2 border-neon/70 [animation-duration:7s]" />
            <span className="glow-pulse absolute inset-3 rounded-full bg-neon/15 blur-xl" />
            <img
              src={PLATFORM.image}
              alt={PLATFORM.name}
              width={48}
              height={48}
              className="relative h-12 w-12 object-contain drop-shadow-[0_0_18px_var(--neon)]"
            />
          </div>

          <p className="relative mt-4 text-[9px] font-bold uppercase tracking-[0.35em] text-neon/70">
            {PLATFORM.name} • Script Activation
          </p>
          <h1 className="relative mt-1.5 text-[22px] font-black leading-tight">
            شروط تشغيل <span className="neon-text">الاسكربت</span>
          </h1>
          <p className="relative mx-auto mt-1.5 max-w-[260px] text-[11px] leading-relaxed text-muted-foreground">
            أكمل الخطوات الخمس بالترتيب لتفعيل اسكربت الفوز على منصة {PLATFORM.name}
          </p>

          {/* progress */}
          <div className="relative mt-5">
            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 text-neon">
                <ShieldCheck className="h-3 w-3" />
                نسبة الإنجاز
              </span>
              <span className="tabular-nums text-foreground">{pct}%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon/50 to-neon shadow-[0_0_10px_var(--neon)]"
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 26 }}
              />
            </div>
          </div>

          <div className="relative mt-4 flex items-center justify-center gap-4 text-[9px] font-bold text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Zap className="h-3 w-3 text-neon" />
              تفعيل فوري
            </span>
            <span className="h-2.5 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3 w-3 text-neon" />
              اتصال آمن
            </span>
            <span className="h-2.5 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-neon" />
              دقة عالية
            </span>
          </div>
        </section>

        <div className="mt-6 space-y-3">
          <Step
            index={1}
            total={TOTAL}
            title="الانضمام إلى قناة التلجرام"
            subtitle="لمتابعة الإشارات اليومية"
            icon={<Send className="h-4 w-4" />}
          >
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-white-outline mt-3 h-10 text-[12px]"
            >
              <Send className="h-3.5 w-3.5" />
              انضمام للقناة
            </a>
          </Step>

          <Step
            index={2}
            total={TOTAL}
            title="التسجيل بالبروموكود"
            subtitle="أدخل الكود أثناء إنشاء الحساب"
            icon={<Copy className="h-4 w-4" />}
          >
            <button
              type="button"
              onClick={copyPromo}
              className="mt-3 flex h-10 w-full items-center justify-between gap-3 rounded-xl border border-dashed border-neon/40 bg-neon/[0.04] px-3 transition-colors hover:bg-neon/10"
            >
              <span className="text-xl font-black tracking-[0.3em] text-neon">{PROMO}</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-neon">
                <Copy className="h-3 w-3" />
                نسخ الكود
              </span>
            </button>

            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <a
                href={REGISTER_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-neon/35 bg-neon/[0.06] text-[11px] font-extrabold text-neon transition-colors hover:bg-neon/15"
              >
                <Smartphone className="h-3.5 w-3.5" />
                أندرويد
              </a>
              <a
                href={REGISTER_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-[11px] font-extrabold text-foreground transition-colors hover:border-neon/40"
              >
                <Apple className="h-3.5 w-3.5" />
                أيفون
              </a>
            </div>
          </Step>

          <Step
            index={3}
            total={TOTAL}
            title="إيداع 300 جنيه أو 6 دولار"
            subtitle="الحد الأدنى لتشغيل الاسكربت"
            icon={<Banknote className="h-4 w-4" />}
          >
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="luxe-card rounded-xl p-3 text-center">
                <Banknote className="mx-auto h-4 w-4 text-neon" />
                <p className="mt-1 text-sm font-black">300 EGP</p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">الجنيه المصري</p>
              </div>
              <div className="luxe-card rounded-xl p-3 text-center">
                <BadgeDollarSign className="mx-auto h-4 w-4 text-neon" />
                <p className="mt-1 text-sm font-black">$6 USD</p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">الدولار الأمريكي</p>
              </div>
            </div>
          </Step>

          <Step
            index={4}
            total={TOTAL}
            title="إدخل الـ ID الخاص بك"
            subtitle="رقم الحساب داخل المنصة"
            icon={<CheckCircle2 className="h-4 w-4" />}
            done={idValid}
          >
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value.replace(/\D/g, "").slice(0, 14))}
              inputMode="numeric"
              maxLength={14}
              placeholder="أدخل رقم الـ ID هنا..."
              className="mt-3 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-center text-base font-black tracking-widest text-foreground outline-none transition-colors placeholder:text-xs placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground focus:border-neon/70"
            />
          </Step>

          <Step
            index={5}
            total={TOTAL}
            title="اختيار اللعبة المطلوبة"
            subtitle="اللعبة التي سيعمل عليها الاسكربت"
            icon={<Sparkles className="h-4 w-4" />}
            done={Boolean(selectedGame)}
          >
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {GAMES.map((g) => (
                <motion.button
                  key={g.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pickGame(g.id)}
                  className={`relative flex h-[84px] w-full items-end justify-center overflow-hidden rounded-xl border text-[10px] font-extrabold transition-all ${
                    selectedGame === g.id
                      ? "border-neon text-neon shadow-[0_0_20px_-8px_var(--neon)]"
                      : "border-white/10 text-foreground hover:border-neon/40"
                  }`}
                >
                  <img
                    src={g.image}
                    alt={g.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <span className="relative z-10 mb-1.5">{g.name}</span>
                  {selectedGame === g.id && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute left-1 top-1"
                    >
                      <CheckCircle2 className="h-4 w-4 text-neon" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </Step>
        </div>

        {/* verify button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ type: "spring", stiffness: 190, damping: 22 }}
          className="mt-6"
        >
          <button
            type="button"
            onClick={() => {
              if (!idValid) {
                toast("الرجاء إدخال ID صحيح");
                return;
              }
              if (!selectedGame) {
                toast("الرجاء اختيار اللعبة المطلوبة");
                return;
              }
              setVerifying(true);
            }}
            className={`relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border text-[14px] font-extrabold transition-all ${
              ready
                ? "border-neon/70 bg-neon/10 text-neon shadow-[0_0_22px_-6px_var(--neon)] animate-breathe"
                : "border-neon/30 bg-neon/[0.05] text-neon/70"
            }`}
          >
            <span className="luxe-hairline-top" />
            <ShieldCheck className="h-4 w-4" />
            التحقق وتشغيل الاسكربت
          </button>
          <p className="mt-2 text-center text-[9px] text-muted-foreground">
            بالضغط على الزر أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </p>
        </motion.div>
      </main>

      <LoadingDialog open={loadingGame} />
      <VerifyDialog
        open={verifying}
        onDone={() => {
          setVerifying(false);
          if (selectedGame) onVerified(selectedGame, userId.trim());
        }}
      />
    </motion.div>
  );
}
