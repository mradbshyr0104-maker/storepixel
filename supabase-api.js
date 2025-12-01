// API للتعامل مع Supabase

class SupabaseAPI {
    constructor() {
        this.client = supabase;
    }

    // جلب جميع البيانات
    async getAllData() {
        try {
            const [vehicles, investments, sponsors, moneyServices, banJail, orders, discountCodes, settings] = await Promise.all([
                this.client.from('vehicles').select('*'),
                this.client.from('investments').select('*'),
                this.client.from('sponsors').select('*'),
                this.client.from('money_services').select('*'),
                this.client.from('ban_jail').select('*'),
                this.client.from('orders').select('*'),
                this.client.from('discount_codes').select('*'),
                this.client.from('settings').select('*')
            ]);

            const settingsObj = {};
            settings.data?.forEach(s => {
                settingsObj[s.key] = s.value;
            });

            return {
                vehicles: vehicles.data || [],
                investments: investments.data || [],
                sponsors: sponsors.data || [],
                moneyServices: moneyServices.data || [],
                banJail: banJail.data || [],
                orders: orders.data || [],
                discountCodes: discountCodes.data || [],
                sale: settingsObj.sale || {},
                maintenanceMode: settingsObj.maintenanceMode || {},
                featuredProducts: settingsObj.featuredProducts || {}
            };
        } catch (error) {
            console.error('خطأ في جلب البيانات:', error);
            throw error;
        }
    }

    // حفظ طلب جديد
    async saveOrder(order) {
        const { data, error } = await this.client
            .from('orders')
            .insert([order]);
        
        if (error) throw error;
        return data;
    }

    // حفظ مستخدم جديد
    async saveUser(user) {
        const { data, error } = await this.client
            .from('users')
            .insert([user])
            .select();
        
        if (error) throw error;
        return data[0];
    }

    // البحث عن مستخدم
    async findUser(identifier) {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .or(`phone.eq.${identifier},email.eq.${identifier}`)
            .maybeSingle();
        
        if (error) throw error;
        return data;
    }

    // جلب طلبات مستخدم
    async getUserOrders(phone) {
        const { data, error } = await this.client
            .from('orders')
            .select('*')
            .eq('customer_phone', phone)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
    }

    // تحديث تقييم منتج
    async updateRating(table, id, totalRating, ratingCount) {
        const { error } = await this.client
            .from(table)
            .update({ total_rating: totalRating, rating_count: ratingCount })
            .eq('id', id);
        
        if (error) throw error;
    }

    // استخدام كود خصم
    async useDiscountCode(code, userInfo) {
        const { data, error } = await this.client
            .from('discount_codes')
            .select('*')
            .eq('code', code)
            .single();
        
        if (error) throw error;
        
        const usedBy = data.used_by || [];
        usedBy.push(userInfo);
        
        const { error: updateError } = await this.client
            .from('discount_codes')
            .update({ used_by: usedBy })
            .eq('code', code);
        
        if (updateError) throw updateError;
        return data;
    }

    // تحديث كود خصم
    async updateDiscountCode(id, updates) {
        const { data, error } = await this.client
            .from('discount_codes')
            .update(updates)
            .eq('id', id)
            .select();
        
        if (error) throw error;
        return data;
    }

    // حفظ كود تفعيل جديد
    async saveVerificationCode(email, code) {
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
        const { data, error } = await this.client
            .from('verification_codes')
            .insert([{ email, code, expires_at: expiresAt }])
            .select();
        
        if (error) throw error;
        return data[0];
    }

    // التحقق من كود التفعيل
    async verifyCode(email, code) {
        const { data, error } = await this.client
            .from('verification_codes')
            .select('*')
            .eq('email', email)
            .eq('code', code)
            .eq('is_used', false)
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
            await this.client
                .from('verification_codes')
                .update({ is_used: true, used_at: new Date().toISOString() })
                .eq('id', data.id);
        }
        
        return data;
    }
}

// إنشاء instance
const supabaseAPI = new SupabaseAPI();

// دالة مساعدة لإرسال البريد الإلكتروني
async function sendVerificationEmail(email, name, code) {
    try {
        console.log(`📧 جاري إرسال الكود إلى: ${email}`);
        
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: '5ed6948f-fcad-478d-b629-8eb47e4cc6d1',
                subject: 'كود تفعيل الحساب - متجر بكسل',
                from_name: 'متجر مقاطعة بكسل',
                to: email,  // ← بريد العميل فقط
                replyto: email,
                message: `مرحباً ${name}!\n\nشكراً لتسجيلك في متجر مقاطعة بكسل.\n\nكود التفعيل الخاص بك هو: ${code}\n\nالكود صالح لمدة 10 دقائق.\n\nإذا لم تطلب هذا الكود، يرجى تجاهل هذه الرسالة.\n\nمع تحيات،\nفريق متجر بكسل`
            })
        });
        
        if (response.ok) {
            console.log(`✅ تم إرسال الكود ${code} بنجاح إلى ${email}`);
        } else {
            console.error(`❌ فشل إرسال البريد إلى ${email}`);
        }
        
        return response.ok;
    } catch (error) {
        console.error('❌ خطأ في إرسال البريد:', error);
        return false;
    }
}
