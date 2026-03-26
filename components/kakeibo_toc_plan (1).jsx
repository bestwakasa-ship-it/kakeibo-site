import { useState } from "react";

const PLANS = {
  half: { label: "半年コース", months: 6, lectures: 12, price: 330000, lumpSum: 300000, lumpDiscount: 30000, installment: 5500, installmentMonths: 60 },
  full: { label: "1年コース", months: 12, lectures: 24, price: 660000, lumpSum: 600000, lumpDiscount: 60000, installment: 11000, installmentMonths: 60 },
};
const CANCELLATION_POLICY = "途中解約後も残回数分の引き落としは継続。受講資格は契約期間終了まで維持。";

const CURRICULUM_HALF = [
  {
    phase: "PHASE 1",
    title: "現実を直視する",
    period: "Month 1（第1〜2回）",
    color: "#4A9EFF",
    lectures: [
      {
        no: 1,
        title: "老後4,000万円の正体と「あなた専用」ゴール設定",
        content: "4,000万円を「逆算可能な数字」として再定義。入会時診断シートを使って受講生ごとの実際の不足額・必要月積立額を計算。漠然とした不安を具体的な数字に変換する。",
        homework: "診断シートの収支記入 + 家計簿アプリ初期設定",
      },
      {
        no: 2,
        title: "あなたのお金はどこに消えているか",
        content: "固定費・変動費・浪費の3分類を実習。オリジナルアプリを使った最初の1ヶ月分の記録方法と、見やすい分析画面の使い方ウォークスルー。",
        homework: "1週間の全支出をアプリ記録 → 翌週伴走スタッフが個別フィードバック",
      },
    ],
  },
  {
    phase: "PHASE 2",
    title: "仕組みを作る",
    period: "Month 2（第3〜4回）",
    color: "#7C6BFF",
    lectures: [
      {
        no: 3,
        title: "貯金できない人の9割が陥る行動パターンと脱出法",
        content: "行動経済学（現在バイアス・損失回避・現状維持バイアス）を使って「なぜ意志力では続かないか」を解説。仕組みで解決するアプローチへ思考転換。",
        homework: "自分の「浪費トリガー」を3つリストアップ → スタッフと対策設計",
      },
      {
        no: 4,
        title: "固定費の最適化・実践編",
        content: "通信費・保険・サブスク・光熱費の見直し手順と平均削減額の提示。「今月中に実行できる」アクションリストを全員に配布。平均¥15,000〜¥30,000/月の削減を狙う。",
        homework: "固定費見直しアクション実行 → 結果をアプリで記録",
      },
    ],
  },
  {
    phase: "PHASE 3",
    title: "先取り貯蓄の自動化",
    period: "Month 3（第5〜6回）",
    color: "#F4A742",
    lectures: [
      {
        no: 5,
        title: "先取り貯蓄の設計と自動振替の実装",
        content: "「残ったら貯める」から「先に貯める」への転換。口座の役割分担（生活口座・貯蓄口座・投資口座）と自動振替の具体的設定手順を画面共有で実習。",
        homework: "自動振替の設定完了 → 月次進捗レポートの第1回確認",
      },
      {
        no: 6,
        title: "変動費コントロール術と予算管理の型",
        content: "食費・外食・娯楽の予算管理法。「我慢」ではなく「予算内で楽しむ」設計。封筒管理のデジタル版実践。家族・パートナーとの家計合意形成の方法も解説。",
        homework: "来月の予算シート作成 → パートナーと共有（家族向け説明資料配布）",
      },
    ],
  },
  {
    phase: "PHASE 4",
    title: "お金のメンタルを整える",
    period: "Month 4（第7〜8回）",
    color: "#4AC864",
    lectures: [
      {
        no: 7,
        title: "お金のメンタルブロック解除",
        content: "「お金は汚い」「投資は怖い」「自分には無理」等の思い込みの棚卸し。過去の失敗体験の再解釈。お金と自分の関係性を変えるワーク。",
        homework: "自分のお金の信念リスト作成 → LINEコミュニティで共有",
      },
      {
        no: 8,
        title: "収入の天井を外す視点",
        content: "副業・スキルアップ・給与交渉の基礎。支出削減だけでは限界がある理由と「収入増加×節約」の両輪設計。自分に合った収入アップの選択肢を整理。",
        homework: "収入アップ候補を1つ選んで具体的行動計画作成",
      },
    ],
  },
  {
    phase: "PHASE 5",
    title: "資産形成の入口",
    period: "Month 5（第9〜10回）",
    color: "#FF6B6B",
    lectures: [
      {
        no: 9,
        title: "貯蓄から資産形成へ（新NISA完全入門）",
        content: "新NISAの仕組みと活用法。銀行預金との比較シミュレーション（30年間の差額を可視化）。証券口座開設の具体的手順と最初の投資設定のウォークスルー。",
        homework: "証券口座開設完了 + 最初の積立設定",
      },
      {
        no: 10,
        title: "老後資産形成の全体設計図",
        content: "年金・退職金・自己資産の3層構造。個人別の不足額と必要積立額の再計算。iDeCo・ふるさと納税・医療費控除の活用で「手取りを増やす」合法的手段の整理。",
        homework: "月次進捗レポート確認 + 資産形成ロードマップ（卒業後の次手）作成",
      },
    ],
  },
  {
    phase: "PHASE 6",
    title: "体質の確立と卒業",
    period: "Month 6（第11〜12回）",
    color: "#FFD700",
    lectures: [
      {
        no: 11,
        title: "6ヶ月の成果振り返りと習慣の固め方",
        content: "資産変化・支出変化・行動変化の3軸での全体振り返り。崩れかけた月の分析と改善パターンの言語化。自走できる家計管理チェックリストの整理。",
        homework: "6ヶ月総括レポート作成（卒業発表会の準備）",
      },
      {
        no: 12,
        title: "卒業：貯蓄体質への転換宣言",
        content: "卒業認定・証明書授与。成果発表会（任意）。卒業後の資産形成ロードマップ（NISA・iDeCo・オフショア等）の提示とアップセル導線の自然な設計。",
        homework: "（なし）卒業おめでとう！",
      },
    ],
  },
];

const CURRICULUM_EXTRA = [
  { no: 13, title: "投資信託の選び方（インデックスvsアクティブ）", phase: "PHASE 7", color: "#4A9EFF" },
  { no: 14, title: "実際に買ってみる（NISA口座実習・画面共有）", phase: "PHASE 7", color: "#4A9EFF" },
  { no: 15, title: "ドルコスト平均法と感情管理（暴落時に売らない思考法）", phase: "PHASE 7", color: "#4A9EFF" },
  { no: 16, title: "生命保険・損保の見直し（保険はリスクヘッジ）", phase: "PHASE 8", color: "#7C6BFF" },
  { no: 17, title: "税制優遇制度をフル活用（iDeCo・ふるさと納税・医療費控除）", phase: "PHASE 8", color: "#7C6BFF" },
  { no: 18, title: "家族・パートナーとのお金の話し方（家庭内財務合意形成）", phase: "PHASE 8", color: "#7C6BFF" },
  { no: 19, title: "ライフイベントへの備え（結婚・出産・住宅・教育費）", phase: "PHASE 9", color: "#F4A742" },
  { no: 20, title: "収入の天井を外す思考法（昇給・転職・副業・事業化）", phase: "PHASE 9", color: "#F4A742" },
  { no: 21, title: "オフショア・海外資産の入口（円安リスクへの分散視点）", phase: "PHASE 9", color: "#F4A742" },
  { no: 22, title: "資産1,000万円の壁を越える戦略", phase: "PHASE 10", color: "#4AC864" },
  { no: 23, title: "1年間の成果発表と未来設計（5年ロードマップ作成）", phase: "PHASE 10", color: "#4AC864" },
  { no: 24, title: "卒業：自走する資産家への転換宣言", phase: "PHASE 10", color: "#4AC864" },
];

const COMPONENTS = [
  { icon: "📚", name: "月2回のライブ講義", freq: "月2回", desc: "Zoom グループ講義。録画アーカイブあり。質疑応答込み。" },
  { icon: "💬", name: "月1回の個別面談", freq: "月1回", desc: "専属スタッフとの1on1。家計数字の確認・個別アドバイス。30分。" },
  { icon: "📱", name: "オリジナル家計簿アプリ", freq: "毎日", desc: "支出記録・固定費管理・貯蓄進捗グラフ。スタッフが閲覧して伴走。" },
  { icon: "🔔", name: "週次進捗フィードバック", freq: "週1回", desc: "スタッフからLINEで個別フィードバック。Duolingo型の習慣化通知設計。" },
  { icon: "👥", name: "LINEコミュニティ", freq: "常時", desc: "受講生グループで孤独感排除。ピア効果で継続モチベ維持。" },
  { icon: "🆘", name: "緊急Q&Aチャット", freq: "週1回", desc: "面談間の離脱防止。週1回のオープンQ&Aチャットセッション。" },
  { icon: "📊", name: "月次進捗レポート", freq: "月1回", desc: "支出変化・貯蓄増加額・行動スコアを自動集計。継続モチベ維持。" },
  { icon: "📋", name: "入会時診断シート", freq: "初回のみ", desc: "資産・支出・目標の数値化。受講生ごとのベースライン設定。" },
  { icon: "👨‍👩‍👧", name: "家族向け説明資料", freq: "入会時", desc: "パートナーの理解・同意を得るための資料。家庭内合意形成。" },
  { icon: "🏆", name: "卒業認定制度", freq: "卒業時", desc: "証明書授与＋SNS拡散設計。完走インセンティブ。" },
  { icon: "🗺️", name: "資産形成ロードマップ", freq: "卒業時", desc: "NISA・iDeCo・オフショア等への自然なアップセル導線。" },
];

const COMPETITORS = [
  {
    name: "ABCash",
    model: "マンツーマン\nパーソナルトレーニング",
    duration: "3ヶ月",
    price: "〜30万円",
    support: "毎日LINE + 週1マンツーマン",
    weak: "①3ヶ月で終了→長期習慣化に弱い ②個別対応のため単価高 ③コミュニティなし（孤独）④家計簿アプリは補助的",
    threat: "最高",
    color: "#FF6B6B",
  },
  {
    name: "ファイナンシャルアカデミー",
    model: "知識提供型\n講義スクール",
    duration: "コース制",
    price: "3,000〜50,000円",
    support: "基本なし",
    weak: "①伴走ゼロ②講義聴いて終わり③家計改善の行動変容率が極めて低い",
    threat: "低",
    color: "#F4A742",
  },
  {
    name: "マネきゃん",
    model: "会社員・公務員\n特化セミナー",
    duration: "単発",
    price: "無料〜数万円",
    support: "ほぼなし",
    weak: "①単発で終わり②伴走・習慣化設計がない③資産形成の入口止まり",
    threat: "低",
    color: "#4A9EFF",
  },
  {
    name: "YouTube系FP・\n個人コーチ",
    model: "動画＋個別相談",
    duration: "不定",
    price: "無料〜個別",
    support: "個人差が大きい",
    weak: "①品質にバラつき②ブランド力なし③体系的プログラムなし",
    threat: "中",
    color: "#7C6BFF",
  },
];

function fmt(n) {
  if (n >= 1e8) return `${(n / 1e8).toFixed(1)}億円`;
  if (n >= 1e4) return `${Math.round(n / 10000)}万円`;
  return `${n.toLocaleString()}円`;
}

export default function App() {
  const [tab, setTab] = useState("競合分析");
  const [curPlan, setCurPlan] = useState("half");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const tabs = ["競合分析", "差別化設計", "サービス設計", "カリキュラム", "収益試算"];

  // Financial calc
  const fixedMonthly = 300000; // 代表報酬・システム・マーケ
  const scenarios = [
    { label: "最小構成", half: 3, full: 1 },
    { label: "標準成長", half: 6, full: 3 },
    { label: "加速成長", half: 5, full: 8 },
  ];
  function calcRev(s) {
    return s.half * PLANS.half.price + s.full * PLANS.full.price;
  }

  return (
    <div style={{ fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif", background: "#080d16", minHeight: "100vh", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(74,158,255,0.15)", padding: "28px 36px 18px", background: "rgba(74,158,255,0.03)" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#4A9EFF", marginBottom: "6px" }}>B2C ONLINE COURSE — BUSINESS DESIGN DOCUMENT</div>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 800, lineHeight: 1.2 }}>
          老後4,000万円問題を解決する<br />
          <span style={{ color: "#4A9EFF" }}>貯蓄体質構築オンライン講座</span> 事業設計書
        </h1>
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#64748b", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <span>半年コース（12講義）/ 1年コース（24講義）</span>
          <span style={{ color: "#4A9EFF" }}>伴走型 × 家計簿アプリ × RIZAP設計思想</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 36px", gap: "0", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: "none", border: "none", padding: "14px 20px", fontSize: "13px",
            cursor: "pointer", color: tab === t ? "#4A9EFF" : "#64748b",
            borderBottom: tab === t ? "2px solid #4A9EFF" : "2px solid transparent",
            fontWeight: tab === t ? 700 : 400, fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "28px 36px", maxWidth: "1080px" }}>

        {/* ===== 競合分析 ===== */}
        {tab === "競合分析" && (
          <div>
            <Sec>市場の構造</Sec>
            <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.8, marginBottom: "24px" }}>
              最重要競合は<strong style={{ color: "#FF6B6B" }}>ABCash（エービーキャッシュ）</strong>。累計6万人超・「お金のRIZAP」として先行。<br />
              しかし<strong style={{ color: "#4A9EFF" }}>3ヶ月で終了・高単価・コミュニティなし・家計簿が補助的</strong>という構造的弱点を抱えている。<br />
              本事業は「半年〜1年の長期伴走 × 家計簿アプリの中心設計 × グループ習慣化」で明確に差別化する。
            </p>

            <div style={{ display: "grid", gap: "14px", marginBottom: "28px" }}>
              {COMPETITORS.map((c, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${c.color}20`,
                  borderLeft: `4px solid ${c.color}`, borderRadius: "10px", padding: "18px 22px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: "16px", whiteSpace: "pre-line" }}>{c.name}</span>
                      <span style={{ marginLeft: "12px", fontSize: "11px", color: "#64748b", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "8px" }}>{c.model.replace("\n", " ")}</span>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      <Badge color="#4A9EFF">{c.duration}</Badge>
                      <Badge color="#F4A742">{c.price}</Badge>
                      <Badge color={c.threat === "最高" ? "#FF6B6B" : c.threat === "中" ? "#F4A742" : "#4AC864"}>
                        脅威:{c.threat}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                    <div>
                      <span style={{ color: "#4A9EFF", fontWeight: 600 }}>サポート: </span>
                      <span style={{ color: "#94a3b8" }}>{c.support}</span>
                    </div>
                    <div>
                      <span style={{ color: "#FF6B6B", fontWeight: 600 }}>致命的弱点: </span>
                      <span style={{ color: "#94a3b8" }}>{c.weak}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Insight color="#FF6B6B">
              <strong>ABCashの最大弱点：3ヶ月で終わる。</strong>家計習慣は3ヶ月では定着しない。リバウンドが起きる。さらに高単価（〜30万）なため参入障壁が高く、エントリー層を取り込めていない。本事業の半年〜1年プランが刺さる理由がここにある。
            </Insight>
          </div>
        )}

        {/* ===== 差別化設計 ===== */}
        {tab === "差別化設計" && (
          <div>
            <Sec>差別化の4軸</Sec>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
              {[
                { num: "01", color: "#4A9EFF", title: "長期伴走（ABCash比2〜4倍）", body: "ABCashは3ヶ月。本事業は6ヶ月〜1年。家計習慣の定着には最低6ヶ月が必要（行動経済学の知見）。長期サポート＝高LTV＝高単価の正当化根拠になる。" },
                { num: "02", color: "#F4A742", title: "家計簿アプリが「中心」", body: "ABCashは家計簿が補助的。本事業はオリジナルアプリへの毎日入力が伴走の核。スタッフがアプリデータを見てフィードバックする仕組み。数字が可視化され続けることで習慣化が加速する。" },
                { num: "03", color: "#7C6BFF", title: "Duolingo型習慣化設計", body: "いつ、どんな言葉で通知するか・途絶えた顧客にどう復帰させるか・達成時にどう承認するか——のスクリプトを全設計済み。離脱防止が売上を守る最重要KPI。" },
                { num: "04", color: "#4AC864", title: "グループ×個別のハイブリッド", body: "ABCashはマンツーマン専門で孤独。本事業は月2回グループ講義（一体感・ピア効果）＋月1回個別面談（個別最適）のハイブリッド。コミュニティがロックインになる。" },
              ].map(d => (
                <div key={d.num} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${d.color}20`, borderTop: `3px solid ${d.color}`, borderRadius: "10px", padding: "22px" }}>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: `${d.color}20`, fontFamily: "monospace" }}>{d.num}</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: d.color, margin: "6px 0 10px" }}>{d.title}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.7 }}>{d.body}</div>
                </div>
              ))}
            </div>

            <Sec>競合比較マトリクス</Sec>
            <div style={{ overflowX: "auto", marginBottom: "24px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr style={{ background: "rgba(74,158,255,0.08)" }}>
                    {["機能・価値", "ABCash", "FA等", "本事業"].map((h, i) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "center", color: i === 3 ? "#4A9EFF" : "#64748b", fontSize: "11px", letterSpacing: "0.5px", borderBottom: "1px solid rgba(74,158,255,0.15)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["家計簿アプリが伴走の核", "△", "❌", "✅"],
                    ["半年以上の長期サポート", "❌", "❌", "✅"],
                    ["グループコミュニティ", "❌", "△", "✅"],
                    ["月次進捗レポート（数値可視化）", "△", "❌", "✅"],
                    ["習慣化通知設計（Duolingo型）", "❌", "❌", "✅"],
                    ["RIZAP型承認スクリプト", "✅", "❌", "✅"],
                    ["価格の参入しやすさ", "❌（高）", "✅（低）", "✅（中）"],
                    ["老後資産形成まで一貫設計", "△", "△", "✅"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "11px 16px", fontWeight: 500 }}>{row[0]}</td>
                      {row.slice(1, 3).map((v, j) => (
                        <td key={j} style={{ padding: "11px 16px", textAlign: "center", fontSize: "15px", color: v.startsWith("✅") ? "#4AC864" : v.startsWith("❌") ? "#ff5555" : "#F4A742" }}>{v}</td>
                      ))}
                      <td style={{ padding: "11px 16px", textAlign: "center", fontSize: "15px", background: "rgba(74,158,255,0.05)", color: "#4A9EFF", fontWeight: 700 }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(74,158,255,0.08), rgba(124,107,255,0.08))", border: "1px solid rgba(74,158,255,0.2)", borderRadius: "10px", padding: "22px" }}>
              <div style={{ fontSize: "10px", color: "#4A9EFF", letterSpacing: "2px", marginBottom: "10px" }}>ポジションステートメント</div>
              <div style={{ fontSize: "17px", fontWeight: 700, lineHeight: 1.6, borderLeft: "3px solid #4A9EFF", paddingLeft: "16px" }}>
                「半年〜1年かけて、<br />
                家計簿を中心に伴走する<br />
                <span style={{ color: "#4A9EFF" }}>貯蓄体質をつくる唯一のプログラム。</span>」
              </div>
            </div>
          </div>
        )}

        {/* ===== サービス設計 ===== */}
        {tab === "サービス設計" && (
          <div>
            <Sec>プラン設計</Sec>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {Object.entries(PLANS).map(([k, v]) => (
                <button key={k} onClick={() => setCurPlan(k)} style={{
                  padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  background: curPlan === k ? "#4A9EFF" : "rgba(255,255,255,0.05)",
                  color: curPlan === k ? "#fff" : "#64748b",
                  border: curPlan === k ? "1px solid #4A9EFF" : "1px solid rgba(255,255,255,0.08)",
                }}>{v.label}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
              {Object.entries(PLANS).map(([k, v]) => (
                <div key={k} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: k === "full" ? "1px solid rgba(244,167,66,0.3)" : "1px solid rgba(74,158,255,0.2)",
                  borderTop: k === "full" ? "3px solid #F4A742" : "3px solid #4A9EFF",
                  borderRadius: "10px", padding: "24px",
                  position: "relative",
                }}>
                  {k === "full" && (
                    <div style={{ position: "absolute", top: "-1px", right: "20px", background: "#F4A742", color: "#000", fontSize: "10px", fontWeight: 800, padding: "3px 10px", borderRadius: "0 0 6px 6px" }}>
                      おすすめ
                    </div>
                  )}
                  <div style={{ fontSize: "11px", color: k === "full" ? "#F4A742" : "#4A9EFF", letterSpacing: "2px", marginBottom: "10px" }}>{v.label}</div>

                  {/* 一括払い */}
                  <div style={{ marginBottom: "10px", background: "rgba(74,200,100,0.06)", border: "1px solid rgba(74,200,100,0.2)", borderRadius: "8px", padding: "10px 14px" }}>
                    <div style={{ fontSize: "10px", color: "#4AC864", marginBottom: "2px" }}>💰 一括払い（早期割引価格）</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontSize: "26px", fontWeight: 900, color: "#4AC864", fontFamily: "monospace" }}>¥{v.lumpSum.toLocaleString()}</span>
                      <span style={{ fontSize: "12px", color: "#4AC864", fontWeight: 700, background: "rgba(74,200,100,0.15)", padding: "2px 7px", borderRadius: "4px" }}>¥{v.lumpDiscount.toLocaleString()} OFF</span>
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
                      定価¥{v.price.toLocaleString()} → <span style={{ color: "#4AC864" }}>1ヶ月分タダ相当</span>
                    </div>
                  </div>

                  {/* 分割払い */}
                  <div style={{ background: k === "full" ? "rgba(244,167,66,0.08)" : "rgba(74,158,255,0.08)", border: `1px solid ${k === "full" ? "rgba(244,167,66,0.2)" : "rgba(74,158,255,0.2)"}`, borderRadius: "8px", padding: "10px 14px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "2px" }}>💳 Stripe 60回分割払い（定価）</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span style={{ fontSize: "26px", fontWeight: 900, color: k === "full" ? "#F4A742" : "#4A9EFF", fontFamily: "monospace" }}>¥{v.installment.toLocaleString()}</span>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>/ 月 × {v.installmentMonths}回</span>
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
                      {k === "half" ? "月¥5,500で貯蓄体質へ。固定費削減額で即ペイ。" : "月¥11,000で老後設計が変わる。"}
                    </div>
                  </div>

                  {/* スペック */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px", marginBottom: "10px" }}>
                    {[
                      ["期間", `${v.months}ヶ月`],
                      ["ライブ講義", `${v.lectures}回`],
                      ["個別面談", `${v.months}回`],
                      ["月次レポート", `${v.months}通`],
                    ].map(([l, r]) => (
                      <div key={l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "6px", padding: "8px 10px" }}>
                        <div style={{ color: "#64748b", fontSize: "10px" }}>{l}</div>
                        <div style={{ fontWeight: 700, fontSize: "14px" }}>{r}</div>
                      </div>
                    ))}
                  </div>

                  {/* 解約ポリシー */}
                  <div style={{ fontSize: "10px", color: "#475569", background: "rgba(0,0,0,0.25)", borderRadius: "6px", padding: "7px 10px", borderLeft: "3px solid #334155" }}>
                    🔒 解約時：残回数の引き落とし継続。受講権は契約期間終了まで維持。
                  </div>
                </div>
              ))}
            </div>

            <Sec>サービス構成要素（全11項目）</Sec>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {COMPONENTS.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "14px" }}>
                  <div style={{ fontSize: "22px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "13px", marginBottom: "2px" }}>{c.name}</div>
                    <div style={{ fontSize: "10px", color: "#4A9EFF", marginBottom: "4px" }}>頻度: {c.freq}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== カリキュラム ===== */}
        {tab === "カリキュラム" && (
          <div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {Object.entries(PLANS).map(([k, v]) => (
                <button key={k} onClick={() => setCurPlan(k)} style={{
                  padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  background: curPlan === k ? "#4A9EFF" : "rgba(255,255,255,0.05)",
                  color: curPlan === k ? "#fff" : "#64748b",
                  border: curPlan === k ? "1px solid #4A9EFF" : "1px solid rgba(255,255,255,0.08)",
                }}>{v.label}</button>
              ))}
            </div>

            <Sec>{PLANS[curPlan].label} カリキュラム（全{PLANS[curPlan].lectures}講義）</Sec>

            <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
              {CURRICULUM_HALF.map((phase, pi) => (
                <div key={pi} style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${phase.color}20`, borderLeft: `4px solid ${phase.color}`, borderRadius: "10px", overflow: "hidden" }}>
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === pi ? null : pi)}
                    style={{ width: "100%", background: "none", border: "none", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <Badge color={phase.color}>{phase.phase}</Badge>
                      <span style={{ fontWeight: 700, fontSize: "14px", color: "#e2e8f0" }}>{phase.title}</span>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>{phase.period}</span>
                    </div>
                    <span style={{ color: phase.color, fontSize: "18px" }}>{expandedPhase === pi ? "−" : "+"}</span>
                  </button>

                  {expandedPhase === pi && (
                    <div style={{ padding: "0 20px 16px", borderTop: `1px solid ${phase.color}10` }}>
                      {phase.lectures.map((lec, li) => (
                        <div key={li} style={{ marginTop: "12px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "14px 16px" }}>
                          <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                            <span style={{ background: phase.color, color: "#000", fontSize: "10px", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", flexShrink: 0 }}>第{lec.no}回</span>
                            <span style={{ fontWeight: 700, fontSize: "13px" }}>{lec.title}</span>
                          </div>
                          <div style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "8px" }}>{lec.content}</div>
                          <div style={{ fontSize: "11px", color: "#4A9EFF" }}>📝 宿題: {lec.homework}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {curPlan === "full" && (
              <>
                <Sec>1年コース追加講義（第13〜24回）</Sec>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {CURRICULUM_EXTRA.map((lec, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", background: "rgba(255,255,255,0.025)", border: `1px solid ${lec.color}15`, borderRadius: "8px", padding: "12px 14px" }}>
                      <Badge color={lec.color} small>第{lec.no}回</Badge>
                      <div>
                        <div style={{ fontSize: "11px", color: lec.color, marginBottom: "2px" }}>{lec.phase}</div>
                        <div style={{ fontSize: "12px", fontWeight: 600 }}>{lec.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== 収益試算 ===== */}
        {tab === "収益試算" && (
          <div>
            <Sec>固定費構造（月次）</Sec>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "6px" }}>
              {[
                { item: "代表報酬（みなし）", val: 200000 },
                { item: "システム・ツール費", val: 30000 },
                { item: "広告・集客費", val: 50000 },
                { item: "雑費・外注", val: 20000 },
              ].map(f => (
                <div key={f.item} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "14px" }}>
                  <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px" }}>{f.item}</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#FF6B6B", fontFamily: "monospace" }}>¥{f.val.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "right", fontSize: "12px", color: "#64748b", marginBottom: "28px" }}>
              月次固定費合計: <span style={{ color: "#FF6B6B", fontWeight: 700, fontSize: "16px" }}>¥{fixedMonthly.toLocaleString()}</span>
            </div>

            <Sec>ブレークイーブン分析</Sec>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "28px" }}>
              {[
                { label: "半年コースのみでBEP", price: PLANS.half.price, n: Math.ceil(fixedMonthly / PLANS.half.price), color: "#4A9EFF" },
                { label: "1年コースのみでBEP", price: PLANS.full.price, n: Math.ceil(fixedMonthly / PLANS.full.price), color: "#F4A742" },
                { label: "ミックス（最小）", custom: "半年×1 + 1年×1 = ¥990,000\n→ 月次黒字転換 ✅（固定費の3.3倍）", color: "#4AC864" },
              ].map(b => (
                <div key={b.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${b.color}20`, borderTop: `3px solid ${b.color}`, borderRadius: "10px", padding: "18px" }}>
                  <div style={{ fontSize: "11px", color: b.color, marginBottom: "8px" }}>{b.label}</div>
                  {b.custom ? (
                    <div style={{ fontSize: "13px", color: "#4AC864", fontWeight: 600, lineHeight: 1.6, whiteSpace: "pre-line" }}>{b.custom}</div>
                  ) : (
                    <>
                      <div style={{ fontSize: "40px", fontWeight: 900, color: b.color, fontFamily: "monospace", lineHeight: 1 }}>{b.n}</div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>件/月 でBEP（単価¥{b.price.toLocaleString()}）</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <Sec>Stripe 60回分割払い 設計</Sec>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "28px" }}>
              {Object.entries(PLANS).map(([k, v]) => {
                const color = k === "full" ? "#F4A742" : "#4A9EFF";
                const stripeRate = 0.036; // Stripe subscription fee ~3.6%
                const stripeFee = Math.round(v.installment * stripeRate);
                const netPerMonth = v.installment - stripeFee;
                const totalNet = netPerMonth * v.installmentMonths;
                const totalFee = stripeFee * v.installmentMonths;
                return (
                  <div key={k} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}25`, borderRadius: "10px", padding: "20px" }}>
                    <div style={{ fontSize: "11px", color, letterSpacing: "1px", marginBottom: "10px" }}>{v.label} — 分割設計</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                      {[
                        { label: "月次請求額（顧客）", val: `¥${v.installment.toLocaleString()}`, highlight: true },
                        { label: "分割回数", val: `${v.installmentMonths}回（5年）`, highlight: false },
                        { label: "Stripe手数料/月 ※概算", val: `¥${stripeFee.toLocaleString()}`, highlight: false },
                        { label: "手取り/月", val: `¥${netPerMonth.toLocaleString()}`, highlight: true },
                        { label: "総回収額（5年）", val: `¥${(v.price).toLocaleString()}`, highlight: false },
                        { label: "Stripe総手数料 ※概算", val: `¥${totalFee.toLocaleString()}`, highlight: false },
                      ].map((item, i) => (
                        <div key={i} style={{ background: item.highlight ? `${color}10` : "rgba(0,0,0,0.2)", borderRadius: "6px", padding: "8px 10px", border: item.highlight ? `1px solid ${color}20` : "none" }}>
                          <div style={{ fontSize: "10px", color: "#64748b" }}>{item.label}</div>
                          <div style={{ fontWeight: 700, color: item.highlight ? color : "#e2e8f0", fontFamily: "monospace" }}>{item.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "rgba(255,200,50,0.06)", border: "1px solid rgba(255,200,50,0.2)", borderLeft: "4px solid #FFD700", borderRadius: "8px", padding: "14px 18px", marginBottom: "28px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.7 }}>
              <strong style={{ color: "#FFD700" }}>⚠️ Stripe分割払いの重要注意点：</strong><br />
              ①「分割払い」はStripeのサブスクリプション（自動課金）で設計する。途中解約時のルールを利用規約に明記必須。<br />
              ②未払いリスク対策：初月に初回請求を即時決済し、残59回を月次自動引き落とし設定。カード有効期限切れ対応も要設定。<br />
              ③税務処理：分割回収でも収益計上タイミングは要確認（契約時一括計上 or 回収都度計上）。税理士に相談推奨。
            </div>

            <Sec>月次シナリオ別 収支試算</Sec>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "28px" }}>
              {scenarios.map((s, i) => {
                const rev = calcRev(s);
                const profit = rev - fixedMonthly;
                const colors = ["#4A9EFF", "#F4A742", "#7C6BFF"];
                return (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${colors[i]}20`, borderRadius: "10px", padding: "18px" }}>
                    <div style={{ fontSize: "12px", color: colors[i], fontWeight: 700, marginBottom: "10px" }}>{s.label}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "14px" }}>半年×{s.half}件 / 1年×{s.full}件</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px" }}>
                      <div>
                        <div style={{ fontSize: "10px", color: "#64748b" }}>月次売上</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "monospace" }}>¥{(rev / 10000).toFixed(0)}万</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "10px", color: "#64748b" }}>月次利益</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: profit >= 0 ? "#4AC864" : "#FF6B6B", fontFamily: "monospace" }}>
                          {profit >= 0 ? "+" : ""}¥{(profit / 10000).toFixed(0)}万
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "10px", padding: "5px 10px", borderRadius: "6px", background: profit >= 0 ? "rgba(74,200,100,0.1)" : "rgba(255,107,107,0.1)", fontSize: "11px", color: profit >= 0 ? "#4AC864" : "#FF6B6B", textAlign: "center", fontWeight: 600 }}>
                      {profit >= 0 ? `✅ 黒字（利益率${Math.round(profit / rev * 100)}%）` : `❌ 赤字`}
                    </div>
                  </div>
                );
              })}
            </div>

            <Sec>年次ロードマップ試算</Sec>
            <div style={{ overflowX: "auto", marginBottom: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "rgba(74,158,255,0.08)" }}>
                    {["年次", "年間売上", "年間利益", "利益率", "受講生数規模", "戦略フォーカス"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#4A9EFF", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", borderBottom: "1px solid rgba(74,158,255,0.15)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: "Year 1", rev: 19800000, profit: 8400000, students: "累計30〜40名", focus: "半年コース主軸・口コミ基盤構築", color: "#4A9EFF" },
                    { year: "Year 2", rev: 59400000, profit: 31800000, students: "累計100〜150名", focus: "1年コース拡充・卒業生のUGC活用", color: "#F4A742" },
                    { year: "Year 3", rev: 132000000, profit: 79200000, students: "累計300名超", focus: "アップセル（オフショア等）展開・グループスケール", color: "#7C6BFF" },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "14px", fontWeight: 700, color: r.color }}>{r.year}</td>
                      <td style={{ padding: "14px", fontWeight: 700, fontFamily: "monospace" }}>{fmt(r.rev)}</td>
                      <td style={{ padding: "14px", fontWeight: 700, color: "#4AC864", fontFamily: "monospace" }}>{fmt(r.profit)}</td>
                      <td style={{ padding: "14px" }}><span style={{ background: "rgba(74,200,100,0.1)", color: "#4AC864", padding: "3px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: 600 }}>{Math.round(r.profit / r.rev * 100)}%</span></td>
                      <td style={{ padding: "14px", fontSize: "12px", color: "#94a3b8" }}>{r.students}</td>
                      <td style={{ padding: "14px", fontSize: "12px", color: "#64748b" }}>{r.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Insight color="#4AC864">
              <strong>結論：</strong>月次固定費¥30万に対し、半年コース1件（¥33万一括）のみでBEP超過。分割払い運用時は月次入金が¥5,500〜¥11,000/件に分散されるため、<strong style={{color:"#4AC864"}}>キャッシュフロー管理が重要</strong>。初期は一括払い受講生を優先獲得しつつ、分割払い受講生を積み上げることで月次定期収入が安定する。Year 1で分割払い受講生30名達成 → 月次定期収入¥165,000〜¥330,000 が固定費の柱になる。Year 3でアップセル（RL360等）追加で売上・利益率ともに劇的拡大。
            </Insight>
          </div>
        )}

      </div>
    </div>
  );
}

function Sec({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 14px" }}>
      <div style={{ width: "3px", height: "18px", background: "#4A9EFF", borderRadius: "2px" }} />
      <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>{children}</h2>
    </div>
  );
}

function Badge({ children, color, small }) {
  return (
    <span style={{
      background: `${color}15`, color, border: `1px solid ${color}30`,
      padding: small ? "2px 6px" : "3px 10px",
      borderRadius: "6px", fontSize: small ? "10px" : "11px", fontWeight: 600, flexShrink: 0,
    }}>{children}</span>
  );
}

function Insight({ children, color = "#4A9EFF" }) {
  return (
    <div style={{
      background: `${color}08`, border: `1px solid ${color}25`, borderLeft: `4px solid ${color}`,
      borderRadius: "8px", padding: "16px 18px", fontSize: "13px", lineHeight: 1.7, color: "#94a3b8",
    }}>{children}</div>
  );
}
