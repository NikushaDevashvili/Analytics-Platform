"use client"

import {
  Search,
  ArrowRight,
  FileText,
  Link,
  Clock,
  Plus,
  X,
  Eye,
  Database,
  Home,
  Settings,
  User,
  MessageSquarePlus,
  History,
  Compass,
  Library,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { useState } from "react"

interface LinkItem {
  id: number
  url: string
  saved: boolean
}

interface SourceItem {
  id: string
  name: string
  selected: boolean
  color: string
  logo: string
}

type ToggleState = "search" | "monitoring"

export default function Component() {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [sources, setSources] = useState<SourceItem[]>([
    { id: "ga", name: "Google Analytics", selected: false, color: "bg-orange-500", logo: "GA" },
    { id: "clarity", name: "Microsoft Clarity", selected: false, color: "bg-blue-500", logo: "MC" },
    { id: "hotjar", name: "Hotjar", selected: false, color: "bg-red-500", logo: "HJ" },
  ])
  const [timeInterval, setTimeInterval] = useState<string | null>(null)
  const [toggleState, setToggleState] = useState<ToggleState>("search")
  const [inputValue, setInputValue] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [showLinksPopover, setShowLinksPopover] = useState(false)
  const [showSourcesPopover, setShowSourcesPopover] = useState(false)
  const [showTimeInput, setShowTimeInput] = useState(false)

  const [tempTimeValue, setTempTimeValue] = useState("")

  const mainSidebarLinks = [
    {
      label: "New Thread",
      href: "#",
      icon: <MessageSquarePlus className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Home",
      href: "#",
      icon: <Home className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Discover",
      href: "#",
      icon: <Compass className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Library",
      href: "#",
      icon: <Library className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "History",
      href: "#",
      icon: <History className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
  ]

  const bottomSidebarLinks = [
    {
      label: "Settings",
      href: "#",
      icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <User className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
  ]

  const handleTimeSubmit = () => {
    if (tempTimeValue) {
      setTimeInterval(tempTimeValue)
      setShowTimeInput(false)
      setTempTimeValue("")
    }
  }

  const addNewLink = () => {
    const newId = Math.max(...links.map((l) => l.id), 0) + 1
    setLinks([...links, { id: newId, url: "", saved: false }])
  }

  const updateLink = (id: number, url: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, url } : link)))
  }

  const saveLink = (id: number) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, saved: true } : link)))
  }

  const removeLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const toggleSource = (sourceId: string) => {
    setSources(sources.map((source) => (source.id === sourceId ? { ...source, selected: !source.selected } : source)))
  }

  const selectedSourcesCount = sources.filter((source) => source.selected).length

  const Logo = () => {
    const { open } = useSidebar()

    return (
      <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <div className="h-8 w-8 bg-black dark:bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white dark:text-black font-bold text-sm">P</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          Perplexity AI
        </motion.span>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-neutral-800 w-full">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mb-8">
              <Logo />
            </div>
            <div className="flex flex-col gap-2">
              {mainSidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-auto">
            {bottomSidebarLinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1">
        <div
          className="flex flex-col items-center justify-center flex-1 px-4 dark:bg-neutral-900 text-[rgba(250,249,245,1)] bg-[rgba(250,249,245,1)] border-8 rounded-3xl"
          style={{ borderColor: "#F5F4ED" }}
        >
          <div className="mb-16">
            <div className="px-8 py-4 bg-gray-100 rounded-lg border border-gray-200">
              <span className="text-gray-800 text-lg font-medium">Logo</span>
            </div>
          </div>

          <div className="w-full max-w-2xl rounded-xl border border-gray-200 shadow-sm p-5 mb-16 bg-white">
            <div className="mb-5">
              <Textarea
                placeholder="I want to control checkout flow, give me alert when dropoff is more than 50%"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full border-0 bg-transparent placeholder:text-gray-500 focus-visible:ring-0 p-0 font-normal resize-none min-h-[24px] overflow-hidden text-sm text-slate-950"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = target.scrollHeight + "px"
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-3 py-2 h-8 rounded-md transition-all duration-200 ${
                    toggleState === "search" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setToggleState("search")}
                  title="Search Mode"
                >
                  <Search className="w-4 h-4 text-gray-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-3 py-2 h-8 rounded-md transition-all duration-200 ${
                    toggleState === "monitoring" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setToggleState("monitoring")}
                  title="Monitoring Mode"
                >
                  <Eye className="w-4 h-4 text-gray-600" />
                </Button>
              </div>

              {toggleState === "monitoring" && (
                <div className="flex items-center space-x-3">
                  <Popover open={showLinksPopover} onOpenChange={setShowLinksPopover}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 px-3 py-2 h-8 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                        title="Manage Links"
                      >
                        <Link className="w-4 h-4 text-gray-600" />
                        {links.length > 0 && (
                          <span className="text-sm font-medium text-gray-700">{links.length} links</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0" align="end" side="bottom" sideOffset={8}>
                      <div className="p-3 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-gray-100 rounded-md">
                            <Link className="w-3.5 h-3.5 text-gray-700" />
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900">Links to inspect</h3>
                        </div>
                      </div>

                      <div className="p-3 max-h-64 overflow-y-auto">
                        <div className="space-y-2">
                          {links.length === 0 ? (
                            <div className="text-center py-6 text-gray-500">
                              <Link className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                              <p className="text-xs">No links added yet</p>
                              <p className="text-xs text-gray-400 mt-1">Click &quot;Insert new link&quot; to start</p>
                            </div>
                          ) : (
                            links.map((link, index) => (
                              <div key={link.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                                <span className="text-gray-700 font-medium text-xs min-w-[40px]">
                                  Link {index + 1}:
                                </span>
                                <Input
                                  value={link.url}
                                  onChange={(e) => updateLink(link.id, e.target.value)}
                                  placeholder="https://example.com"
                                  className="flex-1 h-7 text-xs border-gray-300 focus:border-gray-400 focus:ring-0"
                                />
                                <Button
                                  onClick={() => saveLink(link.id)}
                                  size="sm"
                                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-1 h-7 text-xs"
                                  disabled={link.saved && link.url !== ""}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeLink(link.id)}
                                  className="p-1 h-7 w-7 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))
                          )}

                          <Button
                            onClick={addNewLink}
                            variant="outline"
                            className="w-full border-2 border-dashed border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-200 py-2 rounded-md transition-colors duration-200"
                          >
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            <span className="text-xs">Insert new link</span>
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover open={showSourcesPopover} onOpenChange={setShowSourcesPopover}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 px-3 py-2 h-8 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                        title="Select Data Sources"
                      >
                        <Database className="w-4 h-4 text-gray-600" />
                        {selectedSourcesCount > 0 && (
                          <span className="text-sm font-medium text-gray-700">{selectedSourcesCount} sources</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0" align="end" side="bottom" sideOffset={8}>
                      <div className="p-3 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-gray-100 rounded-md">
                            <Database className="w-3.5 h-3.5 text-gray-700" />
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900">Select Data Sources</h3>
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="space-y-2">
                          {sources.map((source) => (
                            <div
                              key={source.id}
                              className="flex items-center space-x-2.5 p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                            >
                              <Checkbox
                                id={source.id}
                                checked={source.selected}
                                onCheckedChange={() => toggleSource(source.id)}
                                className="data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700 h-4 w-4"
                              />
                              <div
                                className={`w-6 h-6 ${source.color} rounded-md flex items-center justify-center text-white text-xs font-bold`}
                              >
                                {source.logo}
                              </div>
                              <label
                                htmlFor={source.id}
                                className="text-gray-900 font-medium cursor-pointer flex-1 text-sm"
                              >
                                {source.name}
                              </label>
                            </div>
                          ))}

                          {selectedSourcesCount === 0 && (
                            <div className="text-center py-4 text-gray-500">
                              <Database className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                              <p className="text-xs">No sources selected</p>
                              <p className="text-xs text-gray-400 mt-1">Select data sources to monitor</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <div className="flex items-center">
                    {showTimeInput ? (
                      <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <Input
                          type="text"
                          value={tempTimeValue}
                          onChange={(e) => setTempTimeValue(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleTimeSubmit()}
                          onBlur={handleTimeSubmit}
                          placeholder="Every 12hr"
                          className="w-24 h-6 text-sm border border-gray-300 rounded px-2"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 px-3 py-2 h-8 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                        onClick={() => setShowTimeInput(true)}
                        title="Set Time Interval"
                      >
                        <Clock className="w-4 h-4 text-gray-600" />
                        {timeInterval && <span className="text-sm font-medium text-gray-700">{timeInterval}</span>}
                      </Button>
                    )}
                  </div>

                  <RainbowButton className="h-8 px-4 py-2 rounded-md" title="Execute">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </RainbowButton>
                </div>
              )}

              {toggleState === "search" && (
                <RainbowButton className="h-8 px-4 py-2 rounded-md" title="Search">
                  <ArrowRight className="w-4 h-4 text-white" />
                </RainbowButton>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <FileText className="w-4 h-4" />
            <span>
              {toggleState === "search"
                ? "Not sure what to search? Explore our ready-made search ideas."
                : "Configure your monitoring settings above to get started."}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
