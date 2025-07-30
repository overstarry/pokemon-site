import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import PokemonGrid from '@/components/PokemonGrid';

export default function Home() {
  return (
    <PageLayout>

      {/* Hero Section */}
      <PageContainer className="py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            欢迎来到宝可梦世界！
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            探索神奇的宝可梦世界，发现你最喜爱的宝可梦，了解它们的属性、技能和进化形态。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/pokemon">
                🔍 开始探索
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/random">
                🎲 随机宝可梦
              </Link>
            </Button>
          </div>
        </div>
      </PageContainer>

      {/* Featured Pokemon Section */}
      <PageContainer className="py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            热门宝可梦
          </h3>
          <p className="text-white/80 text-lg">
            发现最受欢迎的宝可梦
          </p>
        </div>
        <PokemonGrid limit={8} />
      </PageContainer>

      {/* Features Section */}
      <section className="bg-white/10 backdrop-blur-md py-16">
        <PageContainer>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-4xl mb-4">📚</div>
                <h4 className="text-xl font-bold text-white mb-2">完整图鉴</h4>
                <p className="text-white/80">
                  浏览所有世代的宝可梦，了解它们的详细信息
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-xl font-bold text-white mb-2">属性克制</h4>
                <p className="text-white/80">
                  学习不同属性之间的克制关系，成为训练大师
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-4xl mb-4">🔄</div>
                <h4 className="text-xl font-bold text-white mb-2">进化链</h4>
                <p className="text-white/80">
                  探索宝可梦的进化过程和进化条件
                </p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>
    </PageLayout>
  );
}
