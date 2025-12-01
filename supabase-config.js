// إعدادات Supabase
const SUPABASE_CONFIG = {
    url: 'https://wkhbffibzgnhwupbvphg.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndraGJmZmliemduaHd1cGJ2cGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDEyMzEsImV4cCI6MjA3ODcxNzIzMX0.X69MeJHK3V8DXTMYvAyCaiZcqZsGHLVkqpu0O99qFzE'
};

// مكتبة Supabase
const supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
