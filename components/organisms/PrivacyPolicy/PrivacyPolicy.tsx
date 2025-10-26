import React from "react";

import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedText from "@/components/atoms/ThemedText";
import { ScrollView, StyleSheet, View } from "react-native";

const PrivacyPolicy = () => {
  return (
    <View>
      <ScreenNameWithBack title="قوانین و مقررات" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <ThemedText
            fontType="bold"
            style={[styles.title, { textAlign: "center", marginBottom: 24 }]}
          >
            قوانین و مقررات استفاده از نرم‌افزار «کاریت»
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            با نصب و استفاده از اپلیکیشن کاریتو، شما (به عنوان «کاربر» یا
            «متخصص») می‌پذیرید که کلیه قوانین و شرایط زیر را مطالعه کرده و با آن
            موافقت نموده‌اید. در صورت عدم پذیرش این شرایط، لطفاً از استفاده از
            نرم‌افزار خودداری نمایید.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۱. تعاریف
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            کاریتو: پلتفرم آنلاین ارائه خدمات در محل (نظافت، تعمیرات، زیبایی
            و...) که ارتباط بین متخصصان و مشتریان را برقرار می‌کند. کاربر
            (مشتری): فردی که از طریق اپلیکیشن اقدام به ثبت سفارش خدمات می‌کند.
            متخصص: فردی که از طریق اپلیکیشن به ارائه خدمات به مشتریان می‌پردازد.
            ادمین یا تیم کاریتو: مجموعه‌ای که مالکیت و مدیریت پلتفرم را بر عهده
            دارد.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۲. شرایط عضویت و استفاده
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            عضویت در کاریتو منوط به وارد کردن اطلاعات صحیح (نام، شماره تماس، شهر
            و...) می‌باشد. هر کاربر مسئول حفظ اطلاعات ورود (رمز عبور و شماره
            تماس) خود است. استفاده از حساب کاربری توسط اشخاص دیگر مجاز نیست. تیم
            کاریتو حق دارد در صورت مشاهده تخلف، حساب کاربری فرد را به‌صورت موقت
            یا دائم مسدود نماید.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۳. قوانین مربوط به کاربران (مشتریان)
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            مشتری موظف است هنگام ثبت سفارش، اطلاعات صحیح (آدرس، نوع خدمت، زمان
            حضور و توضیحات لازم) را وارد نماید. لغو سفارش باید حداقل ۱ ساعت قبل
            از زمان شروع خدمت انجام شود. در صورت لغو دیرهنگام یا عدم حضور مشتری
            در محل، ممکن است هزینه‌ای به عنوان جریمه یا ایاب و ذهاب از وی کسر
            شود. مشتری موظف است در حین انجام خدمت، رفتار محترمانه با متخصص داشته
            باشد. پرداخت هزینه خدمات تنها از طریق درگاه‌های امن معرفی‌شده توسط
            کاریتو انجام می‌شود.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۴. قوانین مربوط به متخصصان
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            متخصص موظف است تمامی اطلاعات هویتی، مهارتی و بانکی خود را به‌صورت
            صحیح و کامل در پروفایل ثبت نماید. کاریتو حق دارد مدارک و سوابق متخصص
            را بررسی و در صورت عدم تأیید، دسترسی او را محدود کند. متخصص موظف است
            در زمان مقرر در محل خدمت حاضر شود و کار را مطابق با استانداردهای
            اعلامی انجام دهد. دریافت وجه نقد از مشتری بدون هماهنگی با پلتفرم
            ممنوع است. هرگونه تأخیر، لغو غیرموجه، یا رفتار نامناسب می‌تواند منجر
            به کسر امتیاز یا مسدود شدن حساب شود.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۵. پرداخت‌ها و تسویه حساب
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            کلیه پرداخت‌ها از طریق درگاه‌های رسمی داخل اپ انجام می‌شود. تسویه
            حساب با متخصصین به‌صورت دوره‌ای (مثلاً هفتگی) و پس از کسر سهم پلتفرم
            انجام خواهد شد. کاریتو مسئولیتی در قبال پرداخت‌هایی که خارج از سیستم
            رسمی انجام شده باشند ندارد. در صورت بروز اختلاف در مبلغ یا وضعیت
            سفارش، تیم پشتیبانی کاریتو مرجع رسیدگی خواهد بود.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۶. مسئولیت‌ها
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            کاریتو صرفاً بستر ارتباط میان مشتری و متخصص است و خود به‌صورت مستقیم
            ارائه‌دهنده خدمات نمی‌باشد. مسئولیت کیفیت انجام خدمت بر عهده متخصص
            می‌باشد. در صورت بروز خسارت یا مشکل در حین انجام خدمت، کاریتو در حد
            امکان همکاری لازم جهت بررسی موضوع را خواهد داشت. هیچ‌یک از طرفین
            (مشتری و متخصص) مجاز به تبادل شماره تماس، دریافت یا ارائه خدمات خارج
            از پلتفرم نیستند.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۷. حریم خصوصی
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            اطلاعات کاربران (اعم از شماره تماس، آدرس، موقعیت مکانی و...) به‌صورت
            محرمانه نزد کاریتو نگهداری می‌شود. کاریتو این اطلاعات را تنها برای
            اهداف مربوط به ارائه خدمت و پشتیبانی استفاده می‌کند. اطلاعات شخصی
            کاربران بدون رضایت آن‌ها به هیچ شخص یا سازمان ثالثی ارائه نخواهد شد
            مگر به درخواست مراجع قانونی.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۸. پشتیبانی و رسیدگی به شکایات
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            کاربران می‌توانند از طریق بخش پشتیبانی در اپلیکیشن، تلفن تماس یا
            ایمیل رسمی کاریتو، مشکلات خود را ثبت نمایند. تیم پشتیبانی موظف است
            در سریع‌ترین زمان ممکن درخواست‌ها را بررسی و پاسخ دهد. در صورت وجود
            شکایت از متخصص یا مشتری، تیم کاریتو پس از بررسی مدارک تصمیم نهایی را
            اتخاذ خواهد کرد.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۹. تغییرات در قوانین
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            کاریتو حق دارد در هر زمان، مفاد این قوانین را اصلاح یا به‌روزرسانی
            کند. نسخه به‌روزشده از طریق اپلیکیشن یا وب‌سایت اطلاع‌رسانی خواهد شد
            و استفاده‌ی ادامه‌دار از اپ به منزله‌ی پذیرش قوانین جدید است.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.title}>
            ۱۰. موارد خاص
          </ThemedText>
          <ThemedText style={styles.text} fontType="regular">
            استفاده از اپلیکیشن برای انجام فعالیت‌های غیرقانونی، مغایر با نظم
            عمومی یا مغایر با عرف جامعه ممنوع است. در صورت بروز هرگونه سوء
            استفاده، جعل هویت یا ثبت اطلاعات نادرست، کاریتو حق پیگیری قانونی را
            برای خود محفوظ می‌دارد.
          </ThemedText>
        </ScrollView>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    flexGrow: 1,
    paddingBottom: 100,
  },

  title: {
    marginBottom: 8,
    fontSize: 16,
    marginTop: 24,
  },

  text: {
    fontSize: 16,
  },
});
