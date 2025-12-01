// API للوحة التحكم

class SupabaseAdmin extends SupabaseAPI {
    // إضافة منتج
    async addProduct(table, product) {
        const { data, error } = await this.client
            .from(table)
            .insert([product])
            .select();
        
        if (error) throw error;
        return data[0];
    }

    // تحديث منتج
    async updateProduct(table, id, product) {
        // تنظيف البيانات من القيم الفارغة
        const cleanProduct = {};
        for (const key in product) {
            if (product[key] !== '' && product[key] !== null && product[key] !== undefined) {
                cleanProduct[key] = product[key];
            }
        }
        
        const { data, error } = await this.client
            .from(table)
            .update(cleanProduct)
            .eq('id', id)
            .select();
        
        if (error) {
            console.error('خطأ في تحديث المنتج:', error);
            throw error;
        }
        return data[0];
    }

    // حذف منتج
    async deleteProduct(table, id) {
        const { error } = await this.client
            .from(table)
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    }

    // تحديث حالة طلب
    async updateOrderStatus(orderId, status) {
        const { error } = await this.client
            .from('orders')
            .update({ status })
            .eq('id', orderId);
        
        if (error) throw error;
    }

    // حذف طلب
    async deleteOrder(orderId) {
        const { error } = await this.client
            .from('orders')
            .delete()
            .eq('id', orderId);
        
        if (error) throw error;
    }

    // إضافة كود خصم
    async addDiscountCode(code) {
        const { data, error } = await this.client
            .from('discount_codes')
            .insert([code])
            .select();
        
        if (error) throw error;
        return data[0];
    }

    // حذف كود خصم
    async deleteDiscountCode(id) {
        const { error } = await this.client
            .from('discount_codes')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    }

    // تحديث الإعدادات
    async updateSettings(key, value) {
        const { error } = await this.client
            .from('settings')
            .upsert({ key, value });
        
        if (error) throw error;
    }

    // إضافة مستخدم
    async addUser(user) {
        const { data, error } = await this.client
            .from('admin_users')
            .insert([user])
            .select();
        
        if (error) throw error;
        return data[0];
    }

    // حذف مستخدم
    async deleteUser(id) {
        const { error } = await this.client
            .from('admin_users')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    }

    // تحديث مستخدم
    async updateUser(id, data) {
        const { error } = await this.client
            .from('admin_users')
            .update(data)
            .eq('id', id);
        
        if (error) throw error;
    }
}

const supabaseAdmin = new SupabaseAdmin();
