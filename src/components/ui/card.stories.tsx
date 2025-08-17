import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Users, Calendar, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card with Image</CardTitle>
        <CardDescription>Card with an image in the header</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-32 bg-muted rounded-md mb-4"></div>
        <p>This card has an image placeholder above.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>Team Members</CardTitle>
        </div>
        <CardDescription>Current team members and their roles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Active Members</span>
            <Badge>12</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Pending Invites</span>
            <Badge variant="secondary">3</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Members</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithStats: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
        <CardDescription>Performance metrics for this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Current project progress and next steps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Design Phase - Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Development - In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span>Testing - Pending</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">Edit</Button>
        <Button className="flex-1">Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithError: Story = {
  render: () => (
    <Card className="w-80 border-destructive">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Error Detected</CardTitle>
        </div>
        <CardDescription>There was an issue with the last operation</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          The system encountered an unexpected error while processing your request. 
          Please try again or contact support if the problem persists.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Try Again</Button>
      </CardFooter>
    </Card>
  ),
};

export const Compact: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Today's Tasks</span>
          </div>
          <Badge variant="secondary">8/12</Badge>
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithHover: Story = {
  render: () => (
    <Card className="w-80 cursor-pointer transition-all hover:shadow-elegant hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>This card has hover effects</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the animation effects.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Interact</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithGradient: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
      <CardHeader>
        <CardTitle>Gradient Header</CardTitle>
        <CardDescription>Card with a gradient accent bar</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card features a gradient accent bar at the top.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithTimeline: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium">New user registered</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium">Project updated</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium">System backup completed</p>
              <p className="text-xs text-muted-foreground">3 hours ago</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Activity</Button>
      </CardFooter>
    </Card>
  ),
};
