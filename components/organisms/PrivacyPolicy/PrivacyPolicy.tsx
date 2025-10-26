import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedText from "@/components/atoms/ThemedText";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PrivacyPolicy = () => {
  const BulletItem = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.bulletRow}>
      <View style={styles.bullet} />
      <ThemedText style={styles.text}>{children}</ThemedText>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 13 }}>
        <ScreenNameWithBack title="قوانین و مقررات" />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText fontType="bold" style={styles.heading}>
          قوانین و مقررات استفاده از نرم‌افزار «کاریتو»
        </ThemedText>
        {/* <ThemedText style={styles.text}>
          تاریخ اجرا: 1404/08/03 {"\n"}
          آخرین به‌روزرسانی: 1404/08/03
        </ThemedText> */}

        <ThemedText style={[styles.text, { marginTop: 12 }]}>
          با نصب و استفاده از اپلیکیشن کاریتو، شما (به عنوان «کاربر» یا «متخصص»)
          می‌پذیرید که کلیه قوانین و شرایط زیر را مطالعه کرده و با آن موافقت
          نموده‌اید. در صورت عدم پذیرش این شرایط، لطفاً از استفاده از نرم‌افزار
          خودداری نمایید.
        </ThemedText>

        {/* ---------------- 1 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۱. تعاریف
        </ThemedText>
        <BulletItem>
          کاریتو: پلتفرم آنلاین ارائه خدمات در محل (نظافت، تعمیرات، زیبایی و...)
          که ارتباط بین متخصصان و مشتریان را برقرار می‌کند.
        </BulletItem>
        <BulletItem>
          کاربر (مشتری): فردی که از طریق اپلیکیشن اقدام به ثبت سفارش خدمات
          می‌کند.
        </BulletItem>
        <BulletItem>
          متخصص: فردی که از طریق اپلیکیشن به ارائه خدمات به مشتریان می‌پردازد.
        </BulletItem>
        <BulletItem>
          ادمین یا تیم کاریتو: مجموعه‌ای که مالکیت و مدیریت پلتفرم را بر عهده
          دارد.
        </BulletItem>

        {/* ---------------- 2 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۲. شرایط عضویت و استفاده
        </ThemedText>
        <BulletItem>
          عضویت در کاریتو منوط به وارد کردن اطلاعات صحیح (نام، شماره تماس، شهر
          و...) می‌باشد.
        </BulletItem>
        <BulletItem>
          هر کاربر مسئول حفظ اطلاعات ورود (رمز عبور و شماره تماس) خود است.
        </BulletItem>
        <BulletItem>
          استفاده از حساب کاربری توسط اشخاص دیگر مجاز نیست.
        </BulletItem>
        <BulletItem>
          تیم کاریتو حق دارد در صورت مشاهده تخلف، حساب کاربری فرد را به‌صورت
          موقت یا دائم مسدود نماید.
        </BulletItem>

        {/* ---------------- 3 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۳. قوانین مربوط به کاربران (مشتریان)
        </ThemedText>
        <BulletItem>
          مشتری موظف است هنگام ثبت سفارش، اطلاعات صحیح (آدرس، نوع خدمت، زمان
          حضور و توضیحات لازم) را وارد نماید.
        </BulletItem>
        <BulletItem>
          لغو سفارش باید حداقل ۱ ساعت قبل از زمان شروع خدمت انجام شود.
        </BulletItem>
        <BulletItem>
          در صورت لغو دیرهنگام یا عدم حضور مشتری در محل، ممکن است هزینه‌ای به
          عنوان جریمه یا ایاب و ذهاب از وی کسر شود.
        </BulletItem>
        <BulletItem>
          مشتری موظف است در حین انجام خدمت، رفتار محترمانه با متخصص داشته باشد.
        </BulletItem>
        <BulletItem>
          پرداخت هزینه خدمات تنها از طریق درگاه‌های امن معرفی‌شده توسط کاریتو
          انجام می‌شود.
        </BulletItem>

        {/* ---------------- 4 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۴. قوانین مربوط به متخصصان
        </ThemedText>
        <BulletItem>
          متخصص موظف است تمامی اطلاعات هویتی، مهارتی و بانکی خود را به‌صورت صحیح
          و کامل در پروفایل ثبت نماید.
        </BulletItem>
        <BulletItem>
          کاریتو حق دارد مدارک و سوابق متخصص را بررسی و در صورت عدم تأیید،
          دسترسی او را محدود کند.
        </BulletItem>
        <BulletItem>
          متخصص موظف است در زمان مقرر در محل خدمت حاضر شود و کار را مطابق با
          استانداردهای اعلامی انجام دهد.
        </BulletItem>
        <BulletItem>
          دریافت وجه نقد از مشتری بدون هماهنگی با پلتفرم ممنوع است.
        </BulletItem>
        <BulletItem>
          هرگونه تأخیر، لغو غیرموجه، یا رفتار نامناسب می‌تواند منجر به کسر
          امتیاز یا مسدود شدن حساب شود.
        </BulletItem>

        {/* ---------------- 5 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۵. پرداخت‌ها و تسویه حساب
        </ThemedText>
        <BulletItem>
          کلیه پرداخت‌ها از طریق درگاه‌های رسمی داخل اپ انجام می‌شود.
        </BulletItem>
        <BulletItem>
          تسویه حساب با متخصصین به‌صورت دوره‌ای (مثلاً هفتگی) و پس از کسر سهم
          پلتفرم انجام خواهد شد.
        </BulletItem>
        <BulletItem>
          کاریتو مسئولیتی در قبال پرداخت‌هایی که خارج از سیستم رسمی انجام شده
          باشند ندارد.
        </BulletItem>
        <BulletItem>
          در صورت بروز اختلاف در مبلغ یا وضعیت سفارش، تیم پشتیبانی کاریتو مرجع
          رسیدگی خواهد بود.
        </BulletItem>

        {/* ---------------- 6 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۶. مسئولیت‌ها
        </ThemedText>
        <BulletItem>
          کاریتو صرفاً بستر ارتباط میان مشتری و متخصص است و خود به‌صورت مستقیم
          ارائه‌دهنده خدمات نمی‌باشد.
        </BulletItem>
        <BulletItem>مسئولیت کیفیت انجام خدمت بر عهده متخصص می‌باشد.</BulletItem>
        <BulletItem>
          در صورت بروز خسارت یا مشکل در حین انجام خدمت، کاریتو در حد امکان
          همکاری لازم جهت بررسی موضوع را خواهد داشت.
        </BulletItem>
        <BulletItem>
          هیچ‌یک از طرفین (مشتری و متخصص) مجاز به تبادل شماره تماس، دریافت یا
          ارائه خدمات خارج از پلتفرم نیستند.
        </BulletItem>

        {/* ---------------- 7 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۷. حریم خصوصی
        </ThemedText>
        <BulletItem>
          اطلاعات کاربران (اعم از شماره تماس، آدرس، موقعیت مکانی و...) به‌صورت
          محرمانه نزد کاریتو نگهداری می‌شود.
        </BulletItem>
        <BulletItem>
          کاریتو این اطلاعات را تنها برای اهداف مربوط به ارائه خدمت و پشتیبانی
          استفاده می‌کند.
        </BulletItem>
        <BulletItem>
          اطلاعات شخصی کاربران بدون رضایت آن‌ها به هیچ شخص یا سازمان ثالثی ارائه
          نخواهد شد مگر به درخواست مراجع قانونی.
        </BulletItem>

        {/* ---------------- 8 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۸. پشتیبانی و رسیدگی به شکایات
        </ThemedText>
        <BulletItem>
          کاربران می‌توانند از طریق بخش پشتیبانی در اپلیکیشن، تلفن تماس یا ایمیل
          رسمی کاریتو، مشکلات خود را ثبت نمایند.
        </BulletItem>
        <BulletItem>
          تیم پشتیبانی موظف است در سریع‌ترین زمان ممکن درخواست‌ها را بررسی و
          پاسخ دهد.
        </BulletItem>
        <BulletItem>
          در صورت وجود شکایت از متخصص یا مشتری، تیم کاریتو پس از بررسی مدارک
          تصمیم نهایی را اتخاذ خواهد کرد.
        </BulletItem>

        {/* ---------------- 9 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۹. تغییرات در قوانین
        </ThemedText>
        <BulletItem>
          کاریتو حق دارد در هر زمان، مفاد این قوانین را اصلاح یا به‌روزرسانی
          کند.
        </BulletItem>
        <BulletItem>
          نسخه به‌روزشده از طریق اپلیکیشن یا وب‌سایت اطلاع‌رسانی خواهد شد و
          استفاده‌ی ادامه‌دار از اپ به منزله‌ی پذیرش قوانین جدید است.
        </BulletItem>

        {/* ---------------- 10 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۱۰. موارد خاص
        </ThemedText>
        <BulletItem>
          استفاده از اپلیکیشن برای انجام فعالیت‌های غیرقانونی، مغایر با نظم
          عمومی یا مغایر با عرف جامعه ممنوع است.
        </BulletItem>
        <BulletItem>
          در صورت بروز هرگونه سوءاستفاده، جعل هویت یا ثبت اطلاعات نادرست، کاریتو
          حق پیگیری قانونی را برای خود محفوظ می‌دارد.
        </BulletItem>

        {/* ---------------- 11 ---------------- */}
        <ThemedText fontType="bold" style={styles.title}>
          ۱۱. تماس با ما
        </ThemedText>
        <BulletItem>📍 تهران</BulletItem>
        <BulletItem>📞 پشتیبانی: —</BulletItem>
        <BulletItem>📧 ایمیل: —</BulletItem>
        <BulletItem>🌐 وب‌سایت: www.karito.net</BulletItem>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  heading: {
    textAlign: "center",
    marginVertical: 24,
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 26,
    textAlign: "right",
    flexShrink: 1,
  },
  bulletRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    marginTop: 10,
    marginLeft: 8,
    marginRight: 2,
  },
});
