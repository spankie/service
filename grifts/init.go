package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/spankie/service/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
