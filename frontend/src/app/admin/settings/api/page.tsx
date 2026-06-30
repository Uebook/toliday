import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white capitalize">
                    ${'settings/api'.split('/').pop() || 'settings/api'}
                </h1>
                <p className="text-muted-foreground mt-2">Manage and view details for this module.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Module Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground dark:text-muted-foreground/60">
                        This interface is currently being scaffolded. Content will be implemented soon.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
