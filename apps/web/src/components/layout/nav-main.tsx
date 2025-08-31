import { ChevronRight } from "lucide-react"
import { useLocation } from "@tanstack/react-router"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavGroup, NavItem, NavLink, NavCollapsible } from "@/types/sidebar"

function checkIsActive(href: string, item: NavItem, mainNav = false): boolean {
  const itemUrl = 'url' in item ? item.url : '#'
  
  return (
    href === itemUrl || // exact match
    href.split('?')[0] === itemUrl || // without query params
    ('items' in item && !!item?.items?.filter((i) => i.url === href).length) || // if child nav is active
    (mainNav &&
      href.split('/')[1] !== '' &&
      href.split('/')[1] === itemUrl?.toString().split('/')[1])
  )
}

export function NavMain({
  navGroups,
}: {
  navGroups: NavGroup[]
}) {
  const location = useLocation()
  
  return (
    <>
      {navGroups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel className="font-light text-muted-foreground">{group.title}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => {
              const isActive = checkIsActive(location.pathname, item, true)
              
              return (
                <SidebarMenuItem key={item.title}>
                  {'items' in item ? (
                    <Collapsible
                      asChild
                      defaultOpen={isActive}
                      className="group/collapsible"
                    >
                      <div>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => {
                              const subIsActive = checkIsActive(location.pathname, { url: subItem.url, title: subItem.title }, false)
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={subIsActive}>
                                    <a href={subItem.url}>
                                      {subItem.icon && <subItem.icon />}
                                      <span>{subItem.title}</span>
                                      {subItem.badge && (
                                        <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton tooltip={item.title} asChild isActive={isActive}>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
