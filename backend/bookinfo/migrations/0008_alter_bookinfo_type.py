# Generated by Django 4.0.4 on 2022-06-05 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookinfo', '0007_alter_bookimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookinfo',
            name='type',
            field=models.CharField(choices=[('法律', '法律'), ('教育', '教育'), ('科技', '科技'), ('科学', '科学'), ('漫画', '漫画'), ('体育', '体育'), ('文学', '文学'), ('小说', '小说'), ('艺术', '艺术'), ('医学', '医学'), ('哲学', '哲学'), ('参考书', '参考书'), ('儿童读物', '儿童读物'), ('外国历史', '外国历史'), ('外国文化', '外国文化'), ('休闲娱乐', '休闲娱乐'), ('中国历史', '中国历史'), ('中国文化', '中国文化'), ('家居与园艺', '家居与园艺'), ('家庭与育儿', '家庭与育儿'), ('旅游与自然', '旅游与自然'), ('商业与投资', '商业与投资'), ('传记与自传', '传记与自传'), ('计算机与网络', '计算机与网络'), ('宗教与精神生活', '宗教与精神生活'), ('其他', '其他')], default='法律', max_length=50),
        ),
    ]
