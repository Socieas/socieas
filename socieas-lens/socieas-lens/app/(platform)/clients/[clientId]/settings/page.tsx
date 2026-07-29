import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const members = [
  { name: "Ankit", role: "Owner" },
  { name: "Shiva", role: "Analyst" },
  { name: "Niraj", role: "Viewer" },
];

export default function ClientSettingsPage() {
  return (
    <div className="grid max-w-4xl grid-cols-1 gap-6">
      <Card>
        <CardTitle>Branding</CardTitle>
        <p className="mt-1 text-sm text-muted">
          Logo and brand color used on dashboards and every generated report.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-lg font-black text-white">
            A
          </div>
          <Button variant="secondary">Upload logo</Button>
          <label className="flex items-center gap-2 text-sm font-medium">
            Brand color
            <input type="color" defaultValue="#7C3AED" className="h-9 w-12 cursor-pointer rounded border border-line bg-surface" />
          </label>
        </div>
      </Card>

      <Card>
        <CardTitle>Team access</CardTitle>
        <p className="mt-1 text-sm text-muted">
          Agency &rarr; client &rarr; team members &rarr; permissions. Viewers get read
          only dashboards; a share link gives the client a read only view.
        </p>
        <ul className="mt-4 divide-y divide-line">
          {members.map((m) => (
            <li key={m.name} className="flex items-center justify-between py-3">
              <span className="text-sm font-semibold">{m.name}</span>
              <Badge tone="brand">{m.role}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle>Danger zone</CardTitle>
        <p className="mt-1 text-sm text-muted">
          Deleting a workspace removes its connections, metrics, insights, and
          reports. This cannot be undone.
        </p>
        <Button variant="secondary" className="mt-4 border-negative/40 text-negative">
          Delete workspace
        </Button>
      </Card>
    </div>
  );
}
