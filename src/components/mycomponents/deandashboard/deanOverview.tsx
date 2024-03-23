import { Card, CardTitle, CardContent } from "@/components/ui/card";

export function DeanOverview(){

    return(
        <section>
           <div className="h-14 mt-12 ml-2">
                <h1 className="text-4xl">Welcome back! Dean {localStorage.getItem('name')}!</h1>
            </div> 
            <div className="grid grid-cols-3 grid-flow-row gap-4 ml-2">
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Students Portfolio</CardTitle>
                    <CardContent>
                        <p>175</p>
                    </CardContent>
                </Card>
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Users</CardTitle>
                </Card>
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Active</CardTitle>
                </Card>
                
            </div>

        </section>
    );
}