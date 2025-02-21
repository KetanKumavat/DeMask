import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Shield,
    Map,
    AlertTriangle,
    Navigation,
    Users,
    BarChart,
    ArrowRight,
    CheckCircle,
} from "lucide-react";

export default function Landing() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Shield className="h-6 w-6" />
                        <span className="font-bold">TravelGuard</span>
                    </Link>
                    <nav className="ml-auto flex gap-6">
                        <Link
                            href="#features"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Pricing
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container space-y-6 py-12 text-center md:py-24 lg:py-32">
                    <Badge className="mx-auto" variant="secondary">
                        AI-Powered Travel Safety
                    </Badge>
                    <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                        Travel Safely with
                        <span className="text-primary"> Real-Time</span>{" "}
                        Intelligence
                    </h1>
                    <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Your personal safety companion that provides real-time
                        risk assessment and intelligent routing based on live
                        data and AI-driven insights.
                    </p>
                    <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button size="lg" className="gap-2">
                            Get Started Free
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline">
                            View Live Demo
                        </Button>
                    </div>
                </section>

                {/* Features Grid */}
                <section
                    id="features"
                    className="container py-12 md:py-24 lg:py-32"
                >
                    <div className="mx-auto grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                        <Card className="p-6">
                            <Map className="h-12 w-12 text-primary" />
                            <h3 className="mt-4 font-bold">
                                Real-Time Risk Analysis
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Analyze crime rates, weather alerts, and local
                                incidents in real-time for informed decision
                                making.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <BarChart className="h-12 w-12 text-primary" />
                            <h3 className="mt-4 font-bold">
                                AI-Driven Safety Scoring
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Get route safety scores based on historical data
                                and real-time conditions using advanced AI
                                models.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <Users className="h-12 w-12 text-primary" />
                            <h3 className="mt-4 font-bold">
                                Crowdsourced Reports
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Access verified community safety reports secured
                                by blockchain technology for maximum
                                credibility.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <AlertTriangle className="h-12 w-12 text-primary" />
                            <h3 className="mt-4 font-bold">Risk Forecasting</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Predict potential hazards using AI-powered
                                analysis of patterns and trends.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <Navigation className="h-12 w-12 text-primary" />
                            <h3 className="mt-4 font-bold">Smart Routing</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Get alternative routes and safe zones
                                recommendations based on real-time risk factors.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <Shield className="h-12 w-12 text-primary" />
                            <h3 className="mt-4 font-bold">24/7 Monitoring</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Continuous monitoring and instant alerts for
                                changing safety conditions in your area.
                            </p>
                        </Card>
                    </div>
                </section>

                {/* How It Works */}
                <section
                    id="how-it-works"
                    className="container py-12 md:py-24 lg:py-32"
                >
                    <div className="mx-auto max-w-[58rem] space-y-12 text-center">
                        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                            How TravelGuard Works
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                            <div className="space-y-2">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                    <span className="font-bold text-primary-foreground">
                                        1
                                    </span>
                                </div>
                                <h3 className="font-bold">Location Analysis</h3>
                                <p className="text-sm text-muted-foreground">
                                    We analyze your location and surrounding
                                    areas
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                    <span className="font-bold text-primary-foreground">
                                        2
                                    </span>
                                </div>
                                <h3 className="font-bold">Risk Assessment</h3>
                                <p className="text-sm text-muted-foreground">
                                    AI evaluates potential risks and safety
                                    factors
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                    <span className="font-bold text-primary-foreground">
                                        3
                                    </span>
                                </div>
                                <h3 className="font-bold">Route Planning</h3>
                                <p className="text-sm text-muted-foreground">
                                    Get optimized routes based on safety scores
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                    <span className="font-bold text-primary-foreground">
                                        4
                                    </span>
                                </div>
                                <h3 className="font-bold">Real-time Updates</h3>
                                <p className="text-sm text-muted-foreground">
                                    Receive instant alerts and updates
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Section */}
                <section className="border-t bg-muted/40">
                    <div className="container py-12 md:py-24 lg:py-32">
                        <div className="mx-auto max-w-[58rem] space-y-6 text-center">
                            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                                Trusted by Travelers Worldwide
                            </h2>
                            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                                Join thousands of travelers who rely on
                                TravelGuard for their safety needs.
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8 py-12">
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <span className="text-4xl font-bold">50K+</span>
                                <span className="text-sm text-muted-foreground">
                                    Active Users
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <span className="text-4xl font-bold">100+</span>
                                <span className="text-sm text-muted-foreground">
                                    Countries Covered
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <span className="text-4xl font-bold">1M+</span>
                                <span className="text-sm text-muted-foreground">
                                    Routes Analyzed
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container py-12 md:py-24 lg:py-32">
                    <div className="mx-auto max-w-[58rem] space-y-6 text-center">
                        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                            Start Your Safe Journey Today
                        </h2>
                        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                            Get started with TravelGuard and experience
                            worry-free travel with real-time safety insights.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" className="gap-2">
                                Try TravelGuard Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline">
                                Contact Sales
                            </Button>
                        </div>
                        <div className="mx-auto flex max-w-md justify-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                    14-day free trial
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                    No credit card required
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t">
                <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-2">
                        <Shield className="h-6 w-6" />
                        <span className="font-bold">TravelGuard</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} TravelGuard. All rights
                        reserved.
                    </p>
                    <nav className="flex gap-4">
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:underline underline-offset-4"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:underline underline-offset-4"
                        >
                            Terms
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:underline underline-offset-4"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
