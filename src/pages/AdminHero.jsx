import { useState, useEffect } from "react";

// هيكل الإحصائيات الافتراضي (3 إحصائيات)
const defaultStats = [
  { number: "", label: "" },
  { number: "", label: "" },
  { number: "", label: "" },
];

// الهيكل الافتراضي لكل لغة
const defaultLang = {
  badge: "",
  title1: "",
  title2: "",
  subtitle: "",
  primaryCta: "",
  secondaryCta: "",
  stats: JSON.parse(JSON.stringify(defaultStats)),
};

// 1. (تعديل) نقل baseUrl خارج الـ Component لعدم إرهاق الرندر
let baseUrl = import.meta.env.VITE_API_URL;
baseUrl = baseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

export default function AdminHero() {
  const [formData, setFormData] = useState({
    ar: JSON.parse(JSON.stringify(defaultLang)),
    en: JSON.parse(JSON.stringify(defaultLang)),
    it: JSON.parse(JSON.stringify(defaultLang)),
    leftImage: "",
    rightImage: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`${baseUrl}/api/hero`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data._id) {
            setFormData((prev) => {
              const merged = {
                ...prev,
                leftImage: data.leftImage || "",
                rightImage: data.rightImage || "",
              };

              ["ar", "en", "it"].forEach((lang) => {
                if (data[lang]) {
                  // 2. (تعديل) فصل النسخ المرجعي لمنع تداخل اللغات
                  const defaultLangClone = JSON.parse(
                    JSON.stringify(defaultLang),
                  );
                  merged[lang] = { ...defaultLangClone, ...data[lang] };

                  // 3. (تعديل) إجبار اللوحة على عرض 3 إحصائيات دائماً حتى لو السيرفر أرجع أقل
                  const dbStats = data[lang].stats || [];
                  merged[lang].stats = [0, 1, 2].map(
                    (i) => dbStats[i] || { number: "", label: "" },
                  );
                }
              });
              return merged;
            });
          }
        } else {
          setMessage({
            type: "error",
            text: "غير مصرح لك أو انتهت صلاحية الجلسة",
          });
        }
      } catch (error) {
        setMessage({ type: "error", text: "حدث خطأ أثناء جلب البيانات" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const handleLangChange = (lang, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleStatChange = (lang, index, field, value) => {
    setFormData((prev) => {
      const newStats = [...prev[lang].stats];
      // 4. (تعديل) تعديل الإحصائيات بطريقة صحيحة توافق React
      newStats[index] = { ...newStats[index], [field]: value };
      return {
        ...prev,
        [lang]: { ...prev[lang], stats: newStats },
      };
    });
  };

  const handleImageChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${baseUrl}/api/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "تم حفظ البيانات بنجاح!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        setMessage({
          type: "error",
          text: "فشل حفظ البيانات. تأكد من صلاحية الجلسة.",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "حدث خطأ في الاتصال بالسيرفر" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-xl font-bold text-gray-800">
        جاري تحميل البيانات...
      </div>
    );

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm";

  const InputField = ({
    label,
    value,
    onChange,
    isTextarea = false,
    dir = "auto",
  }) => (
    <div className="mb-5">
      <label className="block text-sm font-bold mb-2 text-gray-800 uppercase tracking-wide">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={dir}
          rows="3"
        />
      ) : (
        <input
          type="text"
          className={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={dir}
        />
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-black mb-8 text-gray-900 border-r-4 border-blue-600 pr-4">
        إدارة قسم البداية (Hero Section)
      </h1>

      {message.text && (
        <div
          className={`p-4 mb-8 rounded-lg font-bold shadow-sm border ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* العربية */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-xl font-black mb-6 text-blue-700 border-b-2 border-gray-100 pb-3">
              اللغة العربية
            </h2>
            <InputField
              label="البادج (Badge)"
              value={formData.ar.badge}
              onChange={(v) => handleLangChange("ar", "badge", v)}
              dir="rtl"
            />
            <InputField
              label="العنوان الأول"
              value={formData.ar.title1}
              onChange={(v) => handleLangChange("ar", "title1", v)}
              dir="rtl"
            />
            <InputField
              label="العنوان الثاني (الذهبي)"
              value={formData.ar.title2}
              onChange={(v) => handleLangChange("ar", "title2", v)}
              dir="rtl"
            />
            <InputField
              label="النص الفرعي"
              value={formData.ar.subtitle}
              onChange={(v) => handleLangChange("ar", "subtitle", v)}
              isTextarea
              dir="rtl"
            />
            <InputField
              label="الزر الأساسي (Primary CTA)"
              value={formData.ar.primaryCta}
              onChange={(v) => handleLangChange("ar", "primaryCta", v)}
              dir="rtl"
            />
            <InputField
              label="الزر الثانوي (Secondary CTA)"
              value={formData.ar.secondaryCta}
              onChange={(v) => handleLangChange("ar", "secondaryCta", v)}
              dir="rtl"
            />

            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">
                الإحصائيات (Stats)
              </h3>
              {formData.ar.stats.map((stat, idx) => (
                <div key={idx} className="flex gap-3 mb-3">
                  <div className="w-1/3">
                    <input
                      type="text"
                      placeholder="الرقم (١٥+)"
                      value={stat.number}
                      onChange={(e) =>
                        handleStatChange("ar", idx, "number", e.target.value)
                      }
                      className={inputStyle}
                      dir="rtl"
                    />
                  </div>
                  <div className="w-2/3">
                    <input
                      type="text"
                      placeholder="الوصف (سنوات خبرة)"
                      value={stat.label}
                      onChange={(e) =>
                        handleStatChange("ar", idx, "label", e.target.value)
                      }
                      className={inputStyle}
                      dir="rtl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الإنجليزية */}
          <div
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-200"
            dir="ltr"
          >
            <h2 className="text-xl font-black mb-6 text-blue-700 border-b-2 border-gray-100 pb-3">
              English (EN)
            </h2>
            <InputField
              label="Badge"
              value={formData.en.badge}
              onChange={(v) => handleLangChange("en", "badge", v)}
            />
            <InputField
              label="Main Title 1"
              value={formData.en.title1}
              onChange={(v) => handleLangChange("en", "title1", v)}
            />
            <InputField
              label="Main Title 2 (Gold)"
              value={formData.en.title2}
              onChange={(v) => handleLangChange("en", "title2", v)}
            />
            <InputField
              label="Subtitle"
              value={formData.en.subtitle}
              onChange={(v) => handleLangChange("en", "subtitle", v)}
              isTextarea
            />
            <InputField
              label="Primary CTA"
              value={formData.en.primaryCta}
              onChange={(v) => handleLangChange("en", "primaryCta", v)}
            />
            <InputField
              label="Secondary CTA"
              value={formData.en.secondaryCta}
              onChange={(v) => handleLangChange("en", "secondaryCta", v)}
            />

            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Stats</h3>
              {formData.en.stats.map((stat, idx) => (
                <div key={idx} className="flex gap-3 mb-3">
                  <div className="w-1/3">
                    <input
                      type="text"
                      placeholder="Number (15+)"
                      value={stat.number}
                      onChange={(e) =>
                        handleStatChange("en", idx, "number", e.target.value)
                      }
                      className={inputStyle}
                    />
                  </div>
                  <div className="w-2/3">
                    <input
                      type="text"
                      placeholder="Label (Years Exp)"
                      value={stat.label}
                      onChange={(e) =>
                        handleStatChange("en", idx, "label", e.target.value)
                      }
                      className={inputStyle}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الإيطالية */}
          <div
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-200"
            dir="ltr"
          >
            <h2 className="text-xl font-black mb-6 text-blue-700 border-b-2 border-gray-100 pb-3">
              Italiano (IT)
            </h2>
            <InputField
              label="Distintivo (Badge)"
              value={formData.it.badge}
              onChange={(v) => handleLangChange("it", "badge", v)}
            />
            <InputField
              label="Titolo 1"
              value={formData.it.title1}
              onChange={(v) => handleLangChange("it", "title1", v)}
            />
            <InputField
              label="Titolo 2 (Oro)"
              value={formData.it.title2}
              onChange={(v) => handleLangChange("it", "title2", v)}
            />
            <InputField
              label="Sottotitolo"
              value={formData.it.subtitle}
              onChange={(v) => handleLangChange("it", "subtitle", v)}
              isTextarea
            />
            <InputField
              label="CTA Primaria"
              value={formData.it.primaryCta}
              onChange={(v) => handleLangChange("it", "primaryCta", v)}
            />
            <InputField
              label="CTA Secondaria"
              value={formData.it.secondaryCta}
              onChange={(v) => handleLangChange("it", "secondaryCta", v)}
            />

            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Statistiche</h3>
              {formData.it.stats.map((stat, idx) => (
                <div key={idx} className="flex gap-3 mb-3">
                  <div className="w-1/3">
                    <input
                      type="text"
                      placeholder="Numero (es. 15+)"
                      value={stat.number}
                      onChange={(e) =>
                        handleStatChange("it", idx, "number", e.target.value)
                      }
                      className={inputStyle}
                    />
                  </div>
                  <div className="w-2/3">
                    <input
                      type="text"
                      placeholder="Etichetta (es. Anni)"
                      value={stat.label}
                      onChange={(e) =>
                        handleStatChange("it", idx, "label", e.target.value)
                      }
                      className={inputStyle}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-black mb-6 text-gray-900 border-b-2 border-gray-100 pb-3">
            صور الخلفية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10" dir="ltr">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <InputField
                label="Left Image URL (Mining)"
                value={formData.leftImage}
                onChange={(v) => handleImageChange("leftImage", v)}
              />
              {formData.leftImage && (
                <img
                  src={formData.leftImage}
                  alt="Left"
                  className="mt-4 h-48 w-full object-cover rounded-lg shadow-sm border border-gray-200"
                />
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <InputField
                label="Right Image URL (Business)"
                value={formData.rightImage}
                onChange={(v) => handleImageChange("rightImage", v)}
              />
              {formData.rightImage && (
                <img
                  src={formData.rightImage}
                  alt="Right"
                  className="mt-4 h-48 w-full object-cover rounded-lg shadow-sm border border-gray-200"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-start pt-4 pb-20">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-12 py-4 text-white font-extrabold rounded-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {isSaving ? "جاري الحفظ..." : "حفظ كافة التعديلات"}
          </button>
        </div>
      </form>
    </div>
  );
}
